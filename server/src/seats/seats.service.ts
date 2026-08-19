import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSeatDto } from "./dto/create-seat.dto.js";
import { UpdateSeatDto } from "./dto/update-seat.dto.js";

@Injectable()
export class SeatsService {
    constructor(private readonly prisma: PrismaService) {}

    findAllByHall(hallId: number) {
        return this.prisma.seat.findMany({
            where: { hallId },
            orderBy: [{ row: 'asc' }, { number: 'asc' }],
        });
    }

    findOne(id: number) {
        return this.prisma.seat.findUnique({ where: { id } });
    }

    create(hallId: number, dto: CreateSeatDto) {
        return this.prisma.seat.create({
            data: { ...dto, hallId },
        });
    }

    patch(id: number, dto: UpdateSeatDto) {
        return this.prisma.seat.update({
            where: { id },
            data: dto,
        });
    }

    delete(id: number) {
        return this.prisma.seat.delete({ where: { id } });
    }
}
