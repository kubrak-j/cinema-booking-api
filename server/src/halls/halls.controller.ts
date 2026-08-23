import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { HallsService } from "./halls.service.js";
import { CreateHallDto } from "./dto/create-hall.dto.js";
import { UpdateHallDto } from "./dto/update-hall.dto.js";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('halls')
export class HallsController {
    constructor(private readonly hallsService: HallsService) {}
    
    @Get()
    findAll(){
        return this.hallsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.hallsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateHallDto) {
        return this.hallsService.create(dto);
    }

    @Patch(':id')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHallDto) {
        return this.hallsService.patch(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number ){
        return this.hallsService.delete(id);
    }
}
