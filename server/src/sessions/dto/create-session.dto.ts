import { IsInt, IsEnum, Min, IsDate, IsNumber } from 'class-validator';
import { SessionStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateSessionDto {
    @Type(() => Date)
    @IsDate()
    startTime!: Date;

    @IsInt()
    @Min(1)
    movieId!: number;

    @IsInt()
    @Min(1)
    hallId!: number;

    @IsEnum(SessionStatus)
    status!: SessionStatus;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    basePrice!: number;
}
