import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET",
    NEXT_PUBLIC_SUPABASE_ANON_KEY_LENGTH: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    NODE_ENV: process.env.NODE_ENV,
    test_fetch: "Will attempt fetch...",
  });
}
