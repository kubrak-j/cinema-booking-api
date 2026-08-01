import { SessionSeedData } from "../types.seed";

export const sessionsConfig: SessionSeedData[] = [
    {
        startTime: new Date("2026-07-26T10:00:00Z"),
        movie: "Toy Story",
        hall: "Blue",
        status: "FINISHED",
        basePrice: 9
    },
    {
        startTime: new Date("2026-07-26T14:30:00Z"),
        movie: "Finding Nemo",
        hall: "Red",
        status: "FINISHED",
        basePrice: 12
    },
    {
        startTime: new Date("2026-07-26T18:00:00Z"),
        movie: "Interstellar",
        hall: "IMAX",
        status: "CANCELLED",
        basePrice: 21
    },
    {
        startTime: new Date("2026-07-27T12:00:00Z"),
        movie: "Shrek",
        hall: "Blue",
        status: "SCHEDULED",
        basePrice: 11
    },
    {
        startTime: new Date("2026-07-27T15:00:00Z"),
        movie: "Spirited Away",
        hall: "Red",
        status: "SCHEDULED",
        basePrice: 12
    },
    {
        startTime: new Date("2026-07-27T19:00:00Z"),
        movie: "Inception",
        hall: "IMAX",
        status: "SCHEDULED",
        basePrice: 22
    },
    {
        startTime: new Date("2026-07-27T21:30:00Z"),
        movie: "The Dark Knight",
        hall: "IMAX",
        status: "SCHEDULED",
        basePrice: 23
    },
    {
        startTime: new Date("2026-07-28T16:00:00Z"),
        movie: "Pulp Fiction",
        hall: "Red",
        status: "SCHEDULED",
        basePrice: 13
    },
    {
        startTime: new Date("2026-07-28T19:30:00Z"),
        movie: "The Wolf of Wall Street",
        hall: "Blue",
        status: "SCHEDULED",
        basePrice: 16
    },
    {
        startTime: new Date("2026-07-28T23:00:00Z"),
        movie: "The Dreamers",
        hall: "Red",
        status: "SCHEDULED",
        basePrice: 15
    }
];