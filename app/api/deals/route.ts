import { getDeals } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const deals = await getDeals();
    return NextResponse.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    return NextResponse.json(
      { error: "Failed to fetch deals" },
      { status: 500 }
    );
  }
}
