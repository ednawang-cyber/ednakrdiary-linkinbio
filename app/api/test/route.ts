import { NextResponse } from "next/server";
import { getHomepageConfig, getCourses } from "@/lib/supabase";

export async function GET() {
  try {
    const config = await getHomepageConfig();
    const courses = await getCourses();

    return NextResponse.json({
      env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? "✅ SET"
          : "❌ NOT SET",
      },
      supabase: {
        config: config ? "✅ Config loaded" : "❌ Config is null",
        courses: `✅ Courses loaded: ${courses?.length || 0} items`,
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    });
  }
}
