import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from "./sessions.service.js";
import { CreateSessionDto } from "./dto/create-session.dto.js";
import { UpdateSessionDto } from "./dto/update-session.dto.js";

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
    create(@Body() dto: CreateSessionDto) {
        return this.sessionsService.create(dto);
    }

    @Patch(':id')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSessionDto) {
        return this.sessionsService.patch(id, dto);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number ){
        return this.sessionsService.delete(id);
    }
}
