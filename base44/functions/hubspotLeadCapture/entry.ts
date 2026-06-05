import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const payload = await req.json();

    const {
      email,
      firstName, lastName, phone,
      source, contactType,
      quizTaken, quizCompletedDate,
      primaryPathway, secondaryPathways, pathway, pathwayInterest,
      state,
      incomeGoal, incomeStyle, launchTimeline,
      biggestBlocker, supportNeeded, localParentNeed,
      readinessLevel, providerIdentity, parentPresence, careLocation,
      launchInterest,
    } = payload;

    if (!email) {
      return Response.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const accessToken = Deno.env.get("HUBSPOT_ACCESS_TOKEN");

    const properties = {};

    // Standard fields
    if (firstName !== undefined)  properties.firstname = String(firstName || "");
    if (lastName !== undefined)   properties.lastname  = String(lastName  || "");
    if (phone !== undefined)      properties.phone     = String(phone     || "");
    properties.email = email;

    // MLS custom properties — only include if provided
    if (contactType)          properties.mls_contact_type       = String(contactType);
    if (source)               properties.mls_lead_source        = String(source);
    if (quizTaken !== undefined) properties.mls_quiz_taken      = String(quizTaken);
    if (quizCompletedDate)    properties.mls_quiz_completed_date = String(quizCompletedDate);
    if (primaryPathway)       properties.mls_primary_pathway    = String(primaryPathway);
    if (secondaryPathways)    properties.mls_secondary_pathways = String(secondaryPathways);
    if (pathway || primaryPathway) properties.mls_pathway       = String(pathway || primaryPathway);
    if (state)                properties.mls_state              = String(state);
    if (incomeGoal)           properties.mls_income_goal        = String(incomeGoal);
    if (incomeStyle)          properties.mls_income_style       = String(incomeStyle);
    if (launchTimeline)       properties.mls_launch_timeline    = String(launchTimeline);
    if (biggestBlocker)       properties.mls_biggest_blocker    = String(biggestBlocker);
    if (supportNeeded)        properties.mls_support_needed     = String(supportNeeded);
    if (localParentNeed)      properties.mls_local_parent_need  = String(localParentNeed);
    if (readinessLevel)       properties.mls_readiness_level    = String(readinessLevel);
    if (providerIdentity)     properties.mls_provider_identity  = String(providerIdentity);
    if (parentPresence)       properties.mls_parent_presence    = String(parentPresence);
    if (careLocation)         properties.mls_care_location      = String(careLocation);
    if (launchInterest !== undefined) properties.mls_launch_interest = String(launchInterest);
    if (pathwayInterest)      properties.mls_pathway_interest   = String(pathwayInterest);

    // Attempt create
    const createResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ properties }),
    });

    const createData = await createResponse.json();

    if (createResponse.ok) {
      return Response.json({ success: true, contactId: createData.id });
    }

    // Contact already exists — upsert by email
    if (createData?.category === "CONFLICT" || createResponse.status === 409) {
      const upsertResponse = await fetch(
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
      const upsertData = await upsertResponse.json();
      if (upsertResponse.ok) {
        return Response.json({ success: true, contactId: upsertData.id, note: "Contact updated." });
      }
      return Response.json({ success: false, error: upsertData?.message || "HubSpot upsert error." }, { status: 500 });
    }

    return Response.json({ success: false, error: createData?.message || "HubSpot error." }, { status: 500 });

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});