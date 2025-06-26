import { z } from 'zod'

export const updateProfileSchema = z.object({
    dob: z.string().optional(), 
    role: z.enum(['user', 'admin']).optional(),
    gender: z.enum(['Male', 'Female', 'Others']).optional(), 
    state: z.string().optional(), 
    city: z.string().optional(), 
    country: z.string().optional(), 
    userId: z.string().uuid(),
});