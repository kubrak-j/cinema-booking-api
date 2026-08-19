import { IsInt, IsEnum, Min } from 'class-validator';
import { SeatCategory } from '@prisma/client';

export class CreateSeatDto {
    @IsInt() @Min(1)
    row!: number;

    @IsInt() @Min(1)
    number!: number;

    @IsEnum(SeatCategory)
    seatCategory!: SeatCategory;
}
