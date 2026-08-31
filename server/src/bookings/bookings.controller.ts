import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import type { Request } from 'express';
import { BookingsService } from "./bookings.service.js";
import { CreateBookingDto } from "./dto/create-booking.dto.js";
import { UpdateBookingDto } from "./dto/update-booking.dto.js";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}
    
    @Get()
    findAll(@Req() req: Request) {
        return this.bookingsService.findAll(req.user!.userId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        return this.bookingsService.findOne(id, req.user!.userId);
    }

    @Post()
    create(@Body() dto: CreateBookingDto, @Req() req: Request) {
        return this.bookingsService.create(dto, req.user!.userId);
    }

    @Patch(':id')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookingDto, @Req() req: Request) {
        return this.bookingsService.patch(id, dto, req.user!.userId);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        return this.bookingsService.delete(id, req.user!.userId);
    }
}
