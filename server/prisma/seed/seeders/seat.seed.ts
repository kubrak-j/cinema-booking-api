import { prisma } from "../../../src/prisma.js";
import { hallsConfig } from "../seeders-config/halls.config.js";

export async function seedSeats() {
    try {
        for(const config of hallsConfig){
            const hall = await prisma.hall.findUnique({
                where: { name: config.name }
            });

            if(!hall){
                console.log(`Hall "${config.name}" not found, skipping seats.`);
                continue;
            }

            for(let row = 1; row <= config.rows; row++){
                for(let number = 1; number <= config.seatsPerRow; number++){

                    const existingSeat = await prisma.seat.findUnique({
                        where: {
                            row_number_hallId: {
                                row: row,
                                number: number,
                                hallId: hall.id
                            }
                        }
                    });

                    if (existingSeat) {
                        console.log(`Seat for hall "${config.name}" not found, skipping seats.`);
                        continue;
                    }

                    const isVip = row > (config.rows - config.vipRows);

                    await prisma.seat.create({
                        data: {
                            row: row,
                            number: number,
                            hallId: hall.id,
                            seatCategory: isVip ? "VIP" : "STANDARD"
                        }
                    });
                }
            }

            console.log(`✓ The seats for the "${config.name}" hall were successfully created`);
        }

    } catch (error) {
        console.error(error);
    }
}