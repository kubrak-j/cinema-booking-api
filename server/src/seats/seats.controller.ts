import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SeatsService } from "./seats.service.js";
import { CreateSeatDto } from "./dto/create-seat.dto.js";
import { UpdateSeatDto } from "./dto/update-seat.dto.js";

@Controller('halls/:hallId/seats')
export class SeatsController {
    constructor(private readonly seatsService: SeatsService) {}

    @Get()
    findAll(@Param('hallId', ParseIntPipe) hallId: number) {
        return this.seatsService.findAllByHall(hallId);
    }

    @Get(':seatId')
    findOne(@Param('seatId', ParseIntPipe) seatId: number) {
        return this.seatsService.findOne(seatId);
    }

    @Post()
    create(@Param('hallId', ParseIntPipe) hallId: number, @Body() dto: CreateSeatDto) {
        return this.seatsService.create(hallId, dto);
    }

    @Patch(':seatId')
    patch(@Param('seatId', ParseIntPipe) seatId: number, @Body() dto: UpdateSeatDto) {
        return this.seatsService.patch(seatId, dto);
    }

    @Delete(':seatId')
    delete(@Param('seatId', ParseIntPipe) seatId: number) {
        return this.seatsService.delete(seatId);
    }
}
