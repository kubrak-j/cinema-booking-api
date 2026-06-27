import { type Request, type Response, type NextFunction } from "express";
import type { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

export function authenticate (req: Request, res: Response, next: NextFunction){
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; role: Role };
        
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export function requireAdmin (req: Request, res: Response, next: NextFunction){

    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ message: "Forbidden" });
    }
        
    next();
}