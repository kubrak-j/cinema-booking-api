import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { SeatCategory } from "@prisma/client";

export class CreateHallDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsArray()
    @IsArray({ each: true })
    layout!: SeatCategory[][];
}
