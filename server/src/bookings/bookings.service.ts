import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from "./dto/create-booking.dto.js";
import { UpdateBookingDto } from "./dto/update-booking.dto.js";
import { priceCalculate } from "../utils/pricing.js";
import { generateTicket } from "../utils/ticket.js";

@Injectable()
export class BookingsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) {}

    private async getOwnedBookingOrThrow(id: number, userId: number) {
        const booking = await this.prisma.booking.findUnique({ where: { id } });

        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('You do not have access to this booking');
        }

        return booking;
    }

    findAll(userId: number) {
        return this.prisma.booking.findMany({ where: { userId }, orderBy: { id: 'asc' } });
    }

    findOne(id: number, userId: number) {
        return this.getOwnedBookingOrThrow(id, userId);
    }

    async create(dto: CreateBookingDto, userId: number) {
        const session = await this.prisma.session.findUnique({
            where: { id: dto.sessionId },
            include: { hall: true },
        });

        if (!session) {
            throw new NotFoundException(`Session with id ${dto.sessionId} not found`);
        }

        const seat = await this.prisma.seat.findUnique({
            where: { id: dto.seatId },
        });

        if (!seat) {
            throw new NotFoundException(`Seat with id ${dto.seatId} not found`);
        }

        if (seat.hallId !== session.hallId) {
            throw new BadRequestException('This seat does not belong to the hall of the selected session');
        }

        const ticketCode = generateTicket(
            this.configService.getOrThrow<string>('TICKET_SECRET'),
            session.id,
            session.hall.name,
            seat.row,
            seat.number,
        );
        const totalPrice = priceCalculate(session.basePrice.toNumber(), seat.seatCategory);

        return this.prisma.booking.create({
            data: {
                ticketCode,
                totalPrice,
                userId: userId,
                sessionId: dto.sessionId,
                seatId: dto.seatId },
        });
    }

    async patch(id: number, dto: UpdateBookingDto, userId: number) {
        await this.getOwnedBookingOrThrow(id, userId);

        return this.prisma.booking.update({ where: { id }, data: dto });
    }

    async delete(id: number, userId: number) {
        await this.getOwnedBookingOrThrow(id, userId);

        return this.prisma.booking.delete({ where: { id } });
    }
}
