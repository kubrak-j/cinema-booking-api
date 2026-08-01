import { BookingSeedData } from "../types.seed";

export const bookingsConfig: BookingSeedData [] = [
    {
        user: "dbrown",
        session: {
            movie: "Toy Story",
            startTime: new Date("2026-07-26T10:00:00Z")
        },
        seat: {
            hall: "Blue",
            row: 3,
            number: 5,
        },
        status: "CONFIRMED",
    },
    {
        user: "egilbert",
        session: {
            movie: "Finding Nemo",
            startTime: new Date("2026-07-26T14:30:00Z")
        },
        seat: {
            hall: "Red",
            row: 6,
            number: 4,
        },
        status: "CONFIRMED",
    },
    {
        user: "fgallagher",
        session: {
            movie: "Interstellar",
            startTime: new Date("2026-07-26T18:00:00Z")
        },
        seat: {
            hall: "IMAX",
            row: 10,
            number: 12,
        },
        status: "CANCELLED",
    },
    {
        user: "gbrooks",
        session: {
            movie: "Shrek",
            startTime: new Date("2026-07-27T12:00:00Z")
        },
        seat: {
            hall: "Blue",
            row: 5,
            number: 2,
        },
        status: "CONFIRMED",
    },
    {
        user: "habbott",
        session: {
            movie: "Shrek",
            startTime: new Date("2026-07-27T12:00:00Z")
        },
        seat: {
            hall: "Blue",
            row: 8,
            number: 10,
        },
        status: "PENDING",
    },
    {
        user: "imalcolm",
        session: {
            movie: "Spirited Away",
            startTime: new Date("2026-07-27T15:00:00Z")
        },
        seat: {
            hall: "Red",
            row: 2,
            number: 7,
        },
        status: "CONFIRMED",
    },
    {
        user: "jroberts",
        session: {
            movie: "Inception",
            startTime: new Date("2026-07-27T19:00:00Z")
        },
        seat: {
            hall: "IMAX",
            row: 9,
            number: 6,
        },
        status: "CONFIRMED",
    },
    {
        user: "dbrown",
        session: {
            movie: "The Dark Knight",
            startTime: new Date("2026-07-27T21:30:00Z")
        },
        seat: {
            hall: "IMAX",
            row: 7,
            number: 11,
        },
        status: "PENDING",
    },
    {
        user: "egilbert",
        session: {
            movie: "Pulp Fiction",
            startTime: new Date("2026-07-28T16:00:00Z")
        },
        seat: {
            hall: "Red",
            row: 4,
            number: 1,
        },
        status: "CONFIRMED",
    },
    {
        user: "fgallagher",
        session: {
            movie: "The Wolf of Wall Street",
            startTime: new Date("2026-07-28T19:30:00Z")
        },
        seat: {
            hall: "Blue",
            row: 1,
            number: 8,
        },
        status: "CONFIRMED",
    }
];
