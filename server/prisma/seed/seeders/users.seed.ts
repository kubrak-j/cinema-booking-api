import { prisma } from "../../../src/prisma.js";
import { usersConfig } from "../seeders-config/users.config.js";

export async function seedUsers(){
    try {
        for ( const config of usersConfig ) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    login: config.login,
                    email: config.email
                }
            });

            const roleName = config.role.toLowerCase(); 

            if(existingUser){
                console.log(`${roleName} "${config.login}" already exists, skipping ${roleName} creation.`);
                continue;
            }

            const newUser = await prisma.user.create({
                data: {
                    name: config.name,
                    login: config.login,
                    email: config.email,
                    password: config.password,
                    role: config.role
                }
            })

            console.log(`✓ ${config.role} "${newUser.login}" was successfully created.`);
        }

    } catch (error) {
        console.error(error);
    }
}
