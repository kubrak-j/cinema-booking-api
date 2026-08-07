import { IsString, IsInt, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { AgeRating } from '@prisma/client';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsInt()
    @Min(1)
    duration!: number;

    @IsEnum(AgeRating)
    ageRating!: AgeRating;
}
