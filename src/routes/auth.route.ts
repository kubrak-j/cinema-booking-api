import { Router } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post(`/register`, async (req, res) => {
    try {
        const parsed = authSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const foundUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: parsed.data.email },
                    { login: parsed.data.login },
                ]
            }
        });

        if (foundUser !== null) {
            if (foundUser.email === parsed.data.email) {
                return res.status(409).json({ message: "Email is already registered" });
            }
            if (foundUser.login === parsed.data.login) {
                return res.status(409).json({ message: "Login is already taken" });
            }
        }

        const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: parsed.data.name,
                login: parsed.data.login,
                email: parsed.data.email,
                password: hashedPassword,
            }
        });

        const { password, ...userWithoutPassword } = newUser;

        res.status(201).json(userWithoutPassword);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post(`/login`, async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        
        if(!parsed.success){
            return res.status(400).json({ message: parsed.error.issues });
        }

        const foundUser = await prisma.user.findUnique({
            where: {
                email: parsed.data.email,
            },
        });

        if(foundUser === null){
            return res.status(404).json({ message: `Invalid email` });
        }

        const isValidPassword = await bcrypt.compare(parsed.data.password, foundUser.password);

        if(!isValidPassword){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({
                userId: foundUser.id,
                role: foundUser.role,
            }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '24h' }
        );

        const { password, ...userWithoutPassword } = foundUser;

        return res.status(200).json({ 
            user: userWithoutPassword,
            token: token, 
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;