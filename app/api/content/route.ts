import { NextRequest, NextResponse } from "next/server";
import { fetchAllContent } from "@/lib/notion";

export async function GET() {
  try {
    const content = await fetchAllContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { courses: [], resources: [], deals: [] },
      { status: 200 }
    );
  }
}
