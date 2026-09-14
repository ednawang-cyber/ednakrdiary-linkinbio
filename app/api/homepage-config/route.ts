import { NextRequest, NextResponse } from "next/server";
import { getHomepageConfig, updateHomepageConfig } from "@/lib/supabase";

// 獲取首頁配置
export async function GET() {
  try {
    const config = await getHomepageConfig();
    if (!config) {
      return NextResponse.json(
        { error: "Config not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("GET /api/homepage-config error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 更新首頁配置
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const success = await updateHomepageConfig(data);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update config" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/homepage-config error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
