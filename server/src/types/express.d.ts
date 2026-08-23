import { Role } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                role: Role;
            };
        }
        interface User {
            id?: number;
            userId: number;
            role: UserRole;
        }
    }
}