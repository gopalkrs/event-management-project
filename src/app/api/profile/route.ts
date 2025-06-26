import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { profiles } from "../../../../migrations/schema";
import { updateProfileSchema } from "@/lib/schema-validate/updateProfileSchema";
import { NewProfileType, PROFILE_TYPE } from "@/types/types";

// type QueryFiltersType = {
//     eventType?: string[];
//     city?: string;
//     state?: string;
//     date?: Date;
// }

export async function POST(req : Request){

    const body = await req.json();

    const parsedBody = updateProfileSchema.safeParse(body);

    if(!parsedBody.success){
        return NextResponse.json({ success: false, error: parsedBody.error.format() }, { status: 400 });
    }

    if(Object.keys(parsedBody.data).length === 0 || Object.keys(parsedBody.data).length === 1){
        return NextResponse.json({ success: false, error: "No data provided to update" }, { status: 400 });
    }
    //const formattedDate = new Date(dob);
    const parsedData = parsedBody.data;
    const { userId } = parsedData;

    const userProfileExist = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);

    console.log(userProfileExist)
    const cleanPayloadData = cleanPayload(parsedData) as NewProfileType;

    if(userProfileExist.length > 0){
        const updatedResult = await db.update(profiles).set(cleanPayloadData).where(eq(profiles.userId, userId)).returning();

        console.log(updatedResult);
        return NextResponse.json({
            message: "Details posted successfully", success: true, data: updatedResult
        });
    }


    const result = await db.insert(profiles).values(cleanPayloadData).returning();

    if(result.length === 0){
        return NextResponse.json({
            message: "Profile creation failed", success: false, data: null
        }, { status: 500 });
    }
    return NextResponse.json({
        message: "Profile created, details posted successfully", success: true, data: result
    });
}


const cleanPayload = (payload : PROFILE_TYPE) => {
    return Object.fromEntries(Object.entries(payload).filter(
        ([, value])=> value!=="" && value!==undefined && value!==null )
    );
    
}