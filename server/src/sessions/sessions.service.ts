import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSessionDto } from "./dto/create-session.dto.js";
import { UpdateSessionDto } from "./dto/update-session.dto.js";

@Injectable()
export class SessionsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.session.findMany({
            orderBy: { id: 'asc' },
        });
    }

    findOne(id: number) {
        return this.prisma.session.findUnique({ where: { id } });
    }

    create(dto: CreateSessionDto) {
        return this.prisma.session.create({ data: dto });
    }

    patch(id: number, dto: UpdateSessionDto) {
        return this.prisma.session.update({
            where: { id },
            data: dto,
        });
    }

    delete(id: number){
        return this.prisma.session.delete({
            where: { id: id }
        })
    }
}
