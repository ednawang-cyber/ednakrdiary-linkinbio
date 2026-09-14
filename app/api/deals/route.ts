import { NextRequest, NextResponse } from "next/server";
import { getDeals, createDeal, updateDeal, deleteDeal } from "@/lib/supabase";

export async function GET() {
  try {
    const deals = await getDeals();
    return NextResponse.json({ deals });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createDeal(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    const success = await updateDeal(id, data);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update deal" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const success = await deleteDeal(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete deal" }, { status: 500 });
  }
}
