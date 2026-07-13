import * as z from "zod";

export const postBookingSchema = z.object({
    sessionId: z.number(),
    seat: z.number(),
});
