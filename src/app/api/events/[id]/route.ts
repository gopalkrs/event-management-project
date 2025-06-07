import { db } from "@/lib/database/db";
import { events } from "@/lib/database/schema/events";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: {params: {id: string}}){
    const result = await db.select().from(events).where(eq(events.id, params.id));

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}

export async function PUT(req: Request, { params }: {params: {id: string}}){

    const body = await req.json();
    const result = await db.update(events).set(body).where(eq(events.id, params.id)).returning();

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}

export async function DELETE(_: Request, { params }: {params: {id: string}}){

    
    const result = await db.delete(events).where(eq(events.id, params.id)).returning();

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}