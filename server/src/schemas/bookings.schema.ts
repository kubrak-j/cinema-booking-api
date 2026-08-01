import * as z from "zod";

export const postBookingSchema = z.object({
    sessionId: z.number(),
    hallName: z.string(),
    number: z.number(),
    row: z.number(),
    seatCategory: z.string(),
    basePrice: z.number()
});
