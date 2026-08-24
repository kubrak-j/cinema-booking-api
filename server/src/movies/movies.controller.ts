import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MoviesService } from "./movies.service.js";
import { CreateMovieDto } from "./dto/create-movie.dto.js";
import { UpdateMovieDto } from "./dto/update-movie.dto.js";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
    
    @Get()
    findAll(){
        return this.moviesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.moviesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateMovieDto) {
        return this.moviesService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
        return this.moviesService.patch(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number ){
        return this.moviesService.delete(id);
    }
}
