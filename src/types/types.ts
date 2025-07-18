import { updateProfileSchema } from "@/lib/schema-validate/updateProfileSchema";
import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { profiles } from "../../migrations/schema";
export type EVENT_TYPE = {
    id: string;
    title: string;
    image: string;
    venue: string;
    city: string;
    state: string;
    eventPrice: number;

}

// export type PROFILE_TYPE = {
//     role: string,
//     gender: string,
//     dob: string,
//     state: string, 
//     city: string,
//     country: string,
// }

export type PROFILE_TYPE =  z.infer<typeof updateProfileSchema>;

export type PAGE_PROPS = {
    eventId: string; 
    category: string
}

export type NewProfileType = InferInsertModel<typeof profiles>;

export type EVENT_DETAILS_TYPE = {
    id: string;
    title: string;
    image: string;
    venue: string;
    city: string;
    state: string;
    eventPrice: number;
    description: string;
    startTime: Date;   
    endTime: Date;
    date: Date;
    eventType: EVENT_TYPE_VALUES;
    createdBy: string;
    capacity: number;

}

// export type EVENT_CATEGORY = 'music' | 'comedy' | 'sports' | 'activities' | 'theatre' | 'meetups' | 'other';

export const eventTypeValues = [
    'concert', 'theatre', 'comedy', 'activities',
    'meetups', 'sports', 'exhibition', 'festival', 'other'
] as const;


export type EVENT_TYPE_VALUES = typeof eventTypeValues[number];
