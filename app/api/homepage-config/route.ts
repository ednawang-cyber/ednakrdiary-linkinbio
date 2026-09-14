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
    console.log("POST /api/homepage-config - Started");
    console.log("SUPABASE_URL:", SUPABASE_URL);
    console.log("SUPABASE_KEY set:", !!SUPABASE_KEY);

    const data = await request.json();
    console.log("Request data:", data);

    try {
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

      console.log("Supabase response status:", response.status);

      if (!response.ok) {
        const error = await response.text();
        console.error("Supabase error response:", error);
        return NextResponse.json(
          { error: `Failed to update config: ${error}` },
          { status: 400 }
        );
      }

      const result = await response.json();
      console.log("Supabase success:", result);
      return NextResponse.json({ success: true });
    } catch (fetchError: any) {
      console.error("Fetch error:", fetchError?.message);
      return NextResponse.json(
        { error: `Network error: ${fetchError?.message}` },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("POST /api/homepage-config error:", error);
    return NextResponse.json(
      { error: `Server error: ${error?.message || "Unknown"}` },
      { status: 500 }
    );
  }
}
