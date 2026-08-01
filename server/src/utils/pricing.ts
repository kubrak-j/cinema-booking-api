import { SeatCategory } from "@prisma/client";

export const priceMultiplier = 1.5;

export function priceCalculate(basePrice: number, seatCategory: SeatCategory): number {
    if (seatCategory === 'STANDARD') {
        return basePrice;
    }
    return basePrice * priceMultiplier;
}
