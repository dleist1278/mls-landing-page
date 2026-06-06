import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const { firstName, lastName, email, state, pathway, stage, source } = await req.json();

    if (!email) {
      return Response.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const accessToken = Deno.env.get("HUBSPOT_ACCESS_TOKEN");

    const properties = {
      firstname: firstName || "",
      lastname: lastName || "",
      email: email,
      hs_lead_status: "NEW",
    };

    if (state) properties.state = state;
    if (pathway) properties.jobtitle = pathway;
    if (stage) properties.mls_readiness_stage = stage;
    if (source) properties.mls_lead_source = source;

    // Try to create contact first
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

    // If contact already exists, upsert via email
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