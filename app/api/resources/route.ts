import { NextRequest, NextResponse } from "next/server";
import { getResources, createResource, updateResource, deleteResource } from "@/lib/supabase";

export async function GET() {
  try {
    const resources = await getResources();
    return NextResponse.json({ resources });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createResource(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    const success = await updateResource(id, data);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const success = await deleteResource(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
