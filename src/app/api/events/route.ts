import { db } from "@/lib/database/db";
import { events } from "@/lib/database/schema/events";
import { EVENT_TYPE_VALUES, eventTypeValues } from "@/types/types";
import { and, desc, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

// type QueryFiltersType = {
//     eventType?: string[];
//     city?: string;
//     state?: string;
//     date?: Date;
// }

export async function POST(req : Request){

    const body = await req.json();

    const {title, description, startTime, image, date, endTime, state, city, eventType, createdBy, capacity, venue, eventPrice} = body;


    const formattedDate = new Date(date); // Converts string to Date
    const fullStartTime = new Date(startTime);
    const fullEndTime = new Date(endTime);
    // console.log("Received in backend:", {
    //     date,
    //     startTime,
    //     endTime,
    //   });

    const result = await db.insert(events).values({
        title, 
        description, 
        image,
        date: formattedDate,
        startTime: fullStartTime,
        endTime: fullEndTime,
        state, 
        venue,
        eventPrice,
        city,
        eventType,
        createdBy, 
        capacity
    }).returning();

    return NextResponse.json({
        message: "Event created successfully", success: true, data: result
    });
}

export async function GET(req: Request){

    const { searchParams } = new URL(req.url);
    const eventTypeParams = searchParams.get('eventType');
    const recentParam = searchParams.get('recent');


    const conditions = []
    if(eventTypeParams){
        //const eventTypes = eventTypeParams.split(",");
        const eventTypes = eventTypeParams.split(',').filter(
            (val): val is EVENT_TYPE_VALUES => eventTypeValues.includes(val as EVENT_TYPE_VALUES)
          );
        conditions.push(inArray(events.eventType, eventTypes));

        const result = await db.select().from(events).where(conditions.length > 0 ? and(...conditions) : undefined);

        return NextResponse.json({
            message: "Events fetched successfully", success: true, data: result
        });
    }
    if(recentParam === "true"){
        const recentResults = await db.select().from(events).orderBy(desc(events.date)).limit(4);

        return NextResponse.json({
            message: "Events fetched successfully", success: true, data: recentResults
        });
    }
    const result = await db.select().from(events);

    return NextResponse.json({
        message: "Events fetched successfully", success: true, data: result
    });
}