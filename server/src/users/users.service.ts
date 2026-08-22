import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    findByLogin(login: string){
        return this.prisma.user.findUnique({ where: { login } })
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findByEmailOrLogin(email: string, login: string) {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { login }
                ]
            },
        });
    }

    create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }
}
