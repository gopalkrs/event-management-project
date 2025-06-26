

import { db } from "@/lib/database/db";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse,  } from "next/server";
import { events } from "../../../../../migrations/schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any ){
    const { id } = context.params;
    //console.log("Fetching event with ID:", id);
    const result = await db.select().from(events).where(eq(events.id, id));

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: Request, context: any){

    const { id } = context.params;
    const body = await req.json();
    console.log(body);
    const result = await db.update(events).set({
        likeCount: sql`likeCount + 1`,
    }).where(eq(events.id, id)).returning();

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_req: Request, context: any){

    const { id } = context.params;
    
    const result = await db.delete(events).where(eq(events.id, id)).returning();

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}