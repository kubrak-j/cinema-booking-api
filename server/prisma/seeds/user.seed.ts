import bcrypt from "bcrypt";
import { prisma } from "../../src/prisma.js";

export async function seedUser(){
    try {
        console.log(`Creating an user...`);

        const foundUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { login: "testUser" },
                    { email: "User@project.com" }
                ]
            }
        });
        
        if(foundUser !== null){
            console.log(`User "${foundUser.login}" already exists, skipping user creation`);
            return;
        };

        const hashedPassword = await bcrypt.hash("password", 10);
        
        const newUser = await prisma.user.create({
            data: {
                name: "User",
                login: "testUser",
                role: "USER",
                email: "user@project.com",
                password: hashedPassword
            }
        });
        
        console.log(`✓ The user "${newUser.login}" was successfully created.`);
    } catch (error) {
        console.error(error);
    }
}
