import { NextRequest, NextResponse } from "next/server";

const ERP_CONFIG = {
  url: "https://erp.soltechtechservices.com",
  apiKey: "8c21c94e1a2879b",
  apiSecret: "3caa5d67879d169",
} as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 New Submission:", body.email);

    // Basic validation
    if (!body.firstName || !body.email) {
      return NextResponse.json(
        { error: "Name & Email required" },
        { status: 400 }
      );
    }

    const pageSource = body.source || "Website";

    // 1️⃣ Build lead source details (industry yahin save hogi)
    const detailedInfo = [
      body.phone ? `Phone: ${body.phone}` : null,
      body.website ? `Website: ${body.website}` : null,
      body.noOfEmployees ? `Employees: ${body.noOfEmployees}` : null,
      body.industry ? `Industry: ${body.industry}` : null,
      body.message ? `Message: ${body.message}` : null,
      body.city ? `City: ${body.city}` : null,
      body.state ? `State: ${body.state}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // 2️⃣ ERP Payload
    const payload: Record<string, any> = {
      first_name: body.firstName,
      last_name: body.lastName || "",
      lead_name: `${body.firstName} ${body.lastName || ""}`.trim(),

      email_id: body.email,
      mobile_no: body.phone || "",
      phone: body.phone || "",

      company_name: body.organizationName || body.company || "",
      website: body.website || "",
      no_of_employees: body.noOfEmployees || "",

      city: body.city || "",
      state: body.state || "",

      source: "Website",
      status: "Lead",

      // ✅ VALID OPTION ONLY
      custom_lead_interest: "SOLTECH Biz Solutions",

      custom_redirect_form: pageSource,
      lead_source_details: detailedInfo,

      lead_owner: "investor@soltechtechservices.com",
    };

    // Remove empty fields
    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key];
    });

    console.log("📤 Sending Payload:", JSON.stringify(payload, null, 2));

    // 3️⃣ Send to ERP
    const response = await fetch(
      `${ERP_CONFIG.url}/api/resource/Lead`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    // 4️⃣ ERROR HANDLING (SMTP ERROR IGNORE)
    if (!response.ok) {
      console.error("🔥 ERP REJECTED DATA:", JSON.stringify(data, null, 2));

      const rawError =
        data?.exception ||
        data?._server_messages ||
        "";

      // ✅ SMTP ERROR KO IGNORE KARO
      if (
        typeof rawError === "string" &&
        rawError.includes("Invalid Outgoing Mail Server or Port")
      ) {
        console.warn("⚠️ SMTP Error Ignored. Lead saved successfully.");

        return NextResponse.json(
          {
            success: true,
            warning: "Lead saved, email failed",
            leadId: data?.data?.name || null,
          },
          { status: 200 }
        );
      }

      // ❌ REAL ERP ERROR
      return NextResponse.json(
        {
          error: "Submission Failed in ERP",
          details: rawError,
        },
        { status: 400 }
      );
    }



    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        leadId: data.data.name,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ SERVER ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
