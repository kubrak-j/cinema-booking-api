import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from "./sessions.service.js";
import { CreateSessionDto } from "./dto/create-session.dto.js";
import { UpdateSessionDto } from "./dto/update-session.dto.js";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from "../auth/guards/roles.guard.js";

@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}
    
    @Get()
    findAll(){
        return this.sessionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.sessionsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    create(@Body() dto: CreateSessionDto) {
        return this.sessionsService.create(dto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSessionDto) {
        return this.sessionsService.patch(id, dto);
    }
    
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    delete(@Param('id', ParseIntPipe) id: number ){
        return this.sessionsService.delete(id);
    }
}
