import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateHallDto } from "./dto/create-hall.dto.js";
import { UpdateHallDto } from "./dto/update-hall.dto.js";
import { SeatCategory } from '@prisma/client';

@Injectable()
export class HallsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.hall.findMany({
            orderBy: { id: 'asc' },
        });
    }

    findOne(id: number) {
        return this.prisma.hall.findUnique({
            where: { id },
            include: { seats: true },
        });
    }

    create(dto: CreateHallDto) {
        const seats = this.buildSeatsFromLayout(dto.layout);

        return this.prisma.hall.create({
            data: {
                name: dto.name,
                seats: { create: seats },
            },
            include: {
                seats: {
                    select: { id: true, row: true, number: true, seatCategory: true },
                },
            },
        });
    }

    private buildSeatsFromLayout(layout: CreateHallDto['layout']) {
        const seats: { row: number; number: number; seatCategory: SeatCategory }[] = [];

        layout.forEach((seatRow, rowIndex) => {
            seatRow.forEach((category, seatIndex) => {
                seats.push({
                    row: rowIndex + 1,
                    number: seatIndex + 1,
                    seatCategory: category,
                });
            });
        });

        return seats;
    }

    patch(id: number, dto: UpdateHallDto) {
        return this.prisma.hall.update({
            where: { id },
            data: dto,
        });
    }

    delete(id: number) {
        return this.prisma.hall.delete({ where: { id } });
    }
}
