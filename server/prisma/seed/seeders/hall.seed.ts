import { prisma } from "../../../src/prisma.js";
import { hallsConfig } from "../seeders-config/halls.config.js";

export async function seedHalls(){
    try {
        for(const config of hallsConfig){

            const existingHall = await prisma.hall.findUnique({
                where: { name: config.name }
            });
            
            if(existingHall){
                console.log(`Hall "${config.name}" already exists, skipping.`);
                continue;
            }

            const newHall = await prisma.hall.create({
                data: {
                    name: config.name,
                }
            });

            console.log(`✓ Created "${newHall.name}" hall.`);
        }
    } catch (error) {
        console.error(error);
    }
}