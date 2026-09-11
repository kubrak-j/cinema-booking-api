import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateBookingDto {
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    sessionId!: number;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    seatId!: number;
}
