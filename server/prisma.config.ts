import "dotenv/config";
import { defineConfig, } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seeds/main.seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://ignore",
  },
});
