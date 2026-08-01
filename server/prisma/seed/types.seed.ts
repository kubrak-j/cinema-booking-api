import { AgeRating, Role, SessionStatus, BookingStatus } from "@prisma/client";

export interface MovieSeedData {
    title: string;
    description: string;
    duration: number;
    ageRating: AgeRating
}

export interface UserSeedData {
    name: string;
    login: string;
    email: string;
    password: string;
    role: Role;
}

export interface SessionSeedData {
    startTime: Date;
    movie: string;
    hall: string;
    status: SessionStatus;
    basePrice: number
}

export interface BookingSeedData {
    user: string;
    session: {
        movie: string;
        startTime: Date;
    };
    seat: {
        hall: string;
        row: number;
        number: number;
    };
    status: BookingStatus;
}
