import { NextResponse } from "next/server";
import { profiles } from "../../../../../migrations/schema";
import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, context: any){
    const { id } = context.params;
    //console.log("Fetching profile with ID:", id);
    const profileResult = await db.select().from(profiles).where(eq(profiles.userId, id));

    if(profileResult.length === 0){
        return NextResponse.json({
            message: "Profile not found", success: false, data: null
        }, { status: 404 });
    }

    return NextResponse.json({
        message: "Profile fetched successfully", success: true, data: profileResult
    });
}