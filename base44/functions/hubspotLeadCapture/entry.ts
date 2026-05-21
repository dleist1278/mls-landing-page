import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const { firstName, lastName, email, state, pathway } = await req.json();

    if (!email) {
      return Response.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const accessToken = Deno.env.get("HUBSPOT_ACCESS_TOKEN");

    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        properties: {
          firstname: firstName || "",
          lastname: lastName || "",
          email: email,
          state: state || "",
          hs_lead_status: "NEW",
          // Store pathway in a notes field or a custom property if configured
          jobtitle: pathway || "",
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return Response.json({ success: true, contactId: data.id });
    }

    // Handle duplicate contact (already exists)
    if (data?.category === "CONFLICT" || response.status === 409) {
      return Response.json({ success: true, note: "Already registered." });
    }

    return Response.json({ success: false, error: data?.message || "HubSpot error." }, { status: 500 });

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});