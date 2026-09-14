import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/homepage_config?id=eq.1&select=*`;

    const response = await fetch(url, {
      headers: {
        "apikey": SUPABASE_KEY || "",
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok || !data || data.length === 0) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("GET /api/homepage-config error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/homepage_config?id=eq.1`,
      {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_KEY || "",
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update config" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST /api/homepage-config error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
