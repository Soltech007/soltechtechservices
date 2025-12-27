import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = Number(process.env.BREVO_LIST_ID);



    if (!API_KEY) {
      console.error("🚨 BREVO_API_KEY is missing!");
      return NextResponse.json({ error: "API key not found" }, { status: 401 });
    }

    const payload = {
      email,
      listIds: [LIST_ID],
      updateEnabled: true,
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": API_KEY.trim(), // ✅ .trim() to remove hidden newline/space
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    // console.log("📩 Raw Brevo Response:", response.status, text);

   if (response.status === 201 || response.status === 204) {
  return NextResponse.json({ message: "Subscribed successfully 🎉" }, { status: 200 });
}

    return NextResponse.json(
      { error: `❌ Brevo Error: ${text}` },
      { status: response.status }
    );
  } catch (error) {
    console.error("🔥 Newsletter Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
