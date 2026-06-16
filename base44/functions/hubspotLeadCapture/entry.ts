import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const {
      firstName, lastName, email, state,
      contactType, primaryPathway, source,
      answers = {},
      // flat fields sent from QuizResult
      incomeGoal, incomeStyle, launchTimeline, biggestBlocker,
      supportNeeded, localParentNeed, readinessLevel, providerIdentity,
      parentPresence, careLocation,
    } = payload;

    if (!email) {
      return Response.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const accessToken = Deno.env.get("HUBSPOT_ACCESS_TOKEN");

    // Standard properties — exist on every HubSpot portal
    const properties = {
      firstname: firstName || "",
      lastname: lastName || "",
      email: email,
      hs_lead_status: "NEW",
    };

    // mls_quiz_taken: HubSpot checkbox property expects boolean true/false
    // mls_launch_interest: same
    // mls_quiz_completed_date: HubSpot date property expects Unix timestamp in milliseconds (integer)
    const isQuizLead = contactType === "Quiz Lead";
    const isAppLaunchLead = contactType === "App Launch Lead";

    // Map internal underscore values to HubSpot's hyphenated enum options
    const pathwayMap = {
      home_daycare_nursery: "home-daycare",
      part_time_nursery: "home-daycare",
      kids_classes: "kids-programs",
      kids_programs: "kids-programs",
      homeschool_pod: "homeschool-pods",
      nanny_style_care: "caregiver-launch",
      drop_in_care: "home-daycare",
      mommy_and_me: "kids-programs",
      playgroup_open_play: "kids-programs",
      hybrid_model: "home-daycare",
    };
    const mappedPathway = pathwayMap[primaryPathway] || primaryPathway || "";

    const customProperties = {
      mls_contact_type: contactType || "",
      mls_quiz_taken: isQuizLead,               // boolean — HubSpot checkbox
      mls_launch_interest: isAppLaunchLead,     // boolean — HubSpot checkbox
      mls_quiz_completed_date: isQuizLead ? Date.now() : undefined,  // integer ms timestamp
      mls_primary_pathway: mappedPathway,
      mls_state: state || answers.q_state || "",
      mls_income_goal: answers.q_income_goal || incomeGoal || "",
      mls_income_style: answers.q_income_style || incomeStyle || "",
      mls_launch_timeline: answers.q_launch_timeline || launchTimeline || "",
      mls_biggest_blocker: answers.q_biggest_blocker || biggestBlocker || "",
      mls_support_needed: (() => { const v = answers.q_support_needed || supportNeeded; return Array.isArray(v) ? v.join(";") : (v || ""); })(),
      mls_local_parent_need: (() => { const v = answers.q_local_parent_need || localParentNeed; return Array.isArray(v) ? v.join(";") : (v || ""); })(),
      mls_readiness_level: answers.q_readiness_level || readinessLevel || "",
      mls_provider_identity: answers.q_provider_identity || providerIdentity || "",
      mls_parent_presence: answers.q_parent_presence || parentPresence || "",
      mls_care_location: answers.q_care_location || careLocation || "",
      mls_pathway: mappedPathway,
    };

    // Assign only if value is defined and non-empty string (but allow explicit booleans)
    Object.entries(customProperties).forEach(([key, val]) => {
      if (typeof val === "boolean") {
        properties[key] = val;
      } else if (typeof val === "number" && val > 0) {
        properties[key] = val;
      } else if (typeof val === "string" && val !== "") {
        properties[key] = val;
      }
    });

    // Attempt CREATE
    const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ properties }),
    });

    const createBody = await createRes.json();

    if (createRes.ok) {
      return Response.json({ success: true, contactId: createBody.id });
    }

    // Handle existing contact — PATCH by email
    if (createRes.status === 409 || createBody?.category === "CONFLICT") {
      const patchRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ properties }),
        }
      );
      const patchBody = await patchRes.json();
      if (patchRes.ok) {
        return Response.json({ success: true, contactId: patchBody.id, updated: true });
      }
      console.error("HubSpot PATCH error:", JSON.stringify(patchBody));
      return Response.json({ success: false, error: patchBody?.message || "HubSpot update failed." }, { status: 500 });
    }

    console.error("HubSpot POST error:", JSON.stringify(createBody));
    return Response.json({ success: false, error: createBody?.message || "HubSpot submission failed." }, { status: 500 });

  } catch (error) {
    console.error("hubspotLeadCapture exception:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});