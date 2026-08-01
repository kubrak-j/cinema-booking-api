import { UserSeedData } from "../types.seed";
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("password123", 10);

export const usersConfig: UserSeedData[] = [
    {
        name: "Alice Smith",
        login: "asmith",
        email: "alice.smith@example.com",
        password: hashedPassword,
        role: "ADMIN",
    },
    {
        name: 'Bob Jones',
        login: 'bjones',
        email: 'bob.jones@example.com',
        password: hashedPassword,
        role: 'CASHIER',
    },
    {
        name: 'Clara Oswald',
        login: 'coswald',
        email: 'clara.oswald@example.com',
        password: hashedPassword,
        role: 'CASHIER',
    },
    {
        name: 'David Brown',
        login: 'dbrown',
        email: 'david.brown@example.com',
        password: hashedPassword,
        role: 'USER'
    },
    {
        name: 'Elena Gilbert',
        login: 'egilbert',
        email: 'elena.gilbert@example.com',
        password: hashedPassword,
        role: 'USER',
    },
    {
        name: "Fiona Gallagher",
        login: "fgallagher",
        email: "fiona.g@example.com",
        password: hashedPassword,
        role: "USER"
    },
    {
        name: "George Brooks",
        login: "gbrooks",
        email: "george.b@example.com",
        password: hashedPassword,
        role: "USER"
    },
    {
        name: "Hannah Abbott",
        login: "habbott",
        email: "hannah.a@example.com",
        password: hashedPassword,
        role: "USER"
    },
    {
        name: "Ian Malcolm",
        login: "imalcolm",
        email: "ian.malcolm@example.com",
        password: hashedPassword,
        role: "USER"
    },
    {
        name: "Julia Roberts",
        login: "jroberts",
        email: "julia.r@example.com",
        password: hashedPassword,
        role: "USER"
    }
];
