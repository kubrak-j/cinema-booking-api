import { prisma } from "../../../src/prisma.js";
import { bookingsConfig } from "../seeders-config/bookings.config.js";
import { generateTicket } from "../../../src/utils/ticket.js";
import { priceCalculate } from "../../../src/utils/pricing.js";

export async function seedBookings(){
    try {
        for(const config of bookingsConfig) {
            const user = await prisma.user.findUnique({ where: { login: config.user } });
            if (!user) {
                console.log(`User with login "${config.user}" not found, skipping booking.`);
                continue;
            }

            const movie = await prisma.movie.findFirst({ where: { title: config.session.movie } });
            if (!movie) {
                console.log(`Movie "${config.session.movie}" not found, skipping booking.`);
                continue;
            }

            const hall = await prisma.hall.findUnique({ where: { name: config.seat.hall } });
            if (!hall) {
                console.log(`Hall "${config.seat.hall}" not found, skipping booking.`);
                continue;
            }

            const exitingSeat = await prisma.seat.findUnique({
                where: {
                    row_number_hallId: {
                        row: config.seat.row,
                        number: config.seat.number,
                        hallId: hall.id
                    }
                }
            });

            if(!exitingSeat){
                console.log(`Seat not found, skipping booking.`);
                continue;
            }

            const existingSession = await prisma.session.findFirst({
                where: {
                    startTime: config.session.startTime,
                    movieId: movie.id,
                    hallId: hall.id
                }
            });

            if(!existingSession){
                console.log(`Session not found, skipping booking.`);
                continue;
            }

            const newBooking = await prisma.booking.create({
                data: {
                    ticketCode: generateTicket(existingSession.id, hall.name, config.seat.row, config.seat.number),
                    status: config.status,
                    totalPrice: priceCalculate(existingSession.basePrice.toNumber(), exitingSeat.seatCategory),
                    userId: user.id,
                    sessionId: existingSession.id,
                    seatId: exitingSeat.id,
                }
            })

            console.log(`✓ Booking for user "${user.login}" was successfully created.`);
        }

    } catch (error) {
        console.error(error);
    }
}
