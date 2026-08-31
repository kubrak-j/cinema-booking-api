import { Role } from "@prisma/client";

declare global {
    namespace Express {
        interface User {
            userId: number;
            role: Role;
        }
    }
}

export {};
