import { db } from "@/lib/database/db";
import { events } from "@/lib/database/schema/events";
import { NextResponse } from "next/server";

export async function POST(req : Request){

    const body = await req.json();

    const {title, description, startTime, image, date, endTime, state, city, eventType, eventTags, createdBy, capacity} = body;


    const formattedDate = new Date(date); // Converts string to Date
    const fullStartTime = new Date(startTime);
    const fullEndTime = new Date(endTime);
    console.log("Received in backend:", {
        date,
        startTime,
        endTime,
      });

      console.log(typeof fullStartTime);
    // console.log(formattedDate.toISOString());
    const result = await db.insert(events).values({
        title, 
        description, 
        image,
        date: formattedDate,
        startTime: fullStartTime,
        endTime: fullEndTime,
        state, 
        city,
        eventType,
        createdBy, 
        capacity
    }).returning();

    return NextResponse.json({
        message: "Event created successfully", success: true, data: result
    });
}

export async function GET(){
    const result = await db.select().from(events);

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}