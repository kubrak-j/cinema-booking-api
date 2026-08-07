import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { UpdateMovieDto } from "./dto/update-movie.dto.js";

@Injectable()
export class MoviesService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.movie.findMany({
            orderBy: { id: 'asc' },
        });
    }

    findOne(id: number) {
        return this.prisma.movie.findUnique({ where: { id } });
    }

    create(dto: CreateMovieDto) {
        return this.prisma.movie.create({ data: dto });
    }

    patch(id: number, dto: UpdateMovieDto) {
        return this.prisma.movie.update({
            where: { id },
            data: dto,
        });
    }

    delete(id: number){
        return this.prisma.movie.delete({
            where: { id: id }
        })
    }
}
