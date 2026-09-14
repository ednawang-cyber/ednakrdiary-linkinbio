import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // 直接测试 Supabase 连接
    console.log("Testing Supabase connection...");
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Key set:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // 測試查詢
    const { data: configData, error: configError } = await supabase
      .from("homepage_config")
      .select("*")
      .eq("id", 1)
      .limit(1);

    console.log("Homepage config query result:", { configData, configError });

    const { data: coursesData, error: coursesError } = await supabase
      .from("courses")
      .select("*")
      .limit(1);

    console.log("Courses query result:", {
      count: coursesData?.length || 0,
      error: coursesError
    });

    return NextResponse.json({
      env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? "✅ SET"
          : "❌ NOT SET",
      },
      queries: {
        homepage_config: {
          data: configData,
          error: configError?.message || "success",
        },
        courses: {
          count: coursesData?.length || 0,
          error: coursesError?.message || "success",
        },
      },
    });
  } catch (error: any) {
    console.error("Test endpoint error:", error);
    return NextResponse.json({
      error: error?.message || String(error),
      stack: error?.stack,
    });
  }
}
