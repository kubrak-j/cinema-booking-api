import bcrypt from "bcrypt";
import { prisma } from "../../src/prisma.js";

export async function seedAdmin(){
    try {
        console.log(`Creating an admin...`);

        const foundAdmin = await prisma.user.findFirst({
            where: {
                OR: [
                    { login: "testAdmin" },
                    { email: "admin@project.com" }
                ]
            }
        });

        if(foundAdmin !== null){
            console.log(`Admin "${foundAdmin.login}" already exists, skipping admin creation`);
            return;
        };

        const hashedPassword = await bcrypt.hash("password", 10);
        
                const newAdmin = await prisma.user.create({
                    data: {
                        name: "Admin",
                        login: "testAdmin",
                        role: "ADMIN",
                        email: "admin@project.com",
                        password: hashedPassword
                    }
                });
        
        console.log(`✓ The admin "${newAdmin.login}" was successfully created.`);
    } catch (error) {
        console.error(error)
    }
}
