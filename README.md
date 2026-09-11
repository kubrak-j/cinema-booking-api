# Cinema Booking API

A REST API for a cinema booking system. Built to master authentication, relational database design, and role-based access control.

> ⚠️ **Note:** This project was migrated from Express to NestJS. The live demo link below currently points to the older Express deployment and will be updated once the NestJS version is redeployed.

## 🌐 Live Demo

API is deployed and available at:
**https://cinema-booking-api-hbld.onrender.com**

> Note: Free tier — first request after inactivity may take 30-60 seconds to wake up.

Example: `GET https://cinema-booking-api-hbld.onrender.com/movies`

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** NestJS
- **ORM:** Prisma (with `@prisma/adapter-pg` driver adapter)
- **Database:** PostgreSQL
- **Validation:** class-validator / class-transformer (request DTOs), Joi (environment variables)
- **Auth:** JWT + bcrypt, role-based guards (USER / ADMIN)
- **Container:** Docker (multi-stage build, separate migration job)

## ✅ Roadmap

### Phase 1 — Foundation
- [x] Project setup, database schema, Docker integration

### Phase 2 — Authentication
- [x] Registration, login, JWT auth guard

### Phase 3 — Admin Features
- [x] Movie & session management, role-based guards

### Phase 4 — Booking
- [x] Seat booking, ownership checks, availability validation

### Phase 5 — Halls & Seats
- [x] Hall creation from a seat-layout matrix, per-seat category management

### Phase 6 — NestJS Migration
- [x] Full rewrite from Express to NestJS (modules, guards, pipes, exception filters)
- [x] Prisma schema redesign (6 normalized tables, enums)
- [x] Multi-stage Docker build with a dedicated migration container, image size optimized

### Phase 7 — Code Quality (in progress)
- [ ] ESLint / Prettier
- [ ] Structured logging
- [ ] CI/CD (GitHub Actions)

### Phase 8 — Payments & Frontend (future)
- [ ] Payment integration
- [ ] React + Vite frontend

## 📦 Installation & Setup

### Option 1 — Docker (recommended)

1. Clone the repository:
```
git clone https://github.com/kubrak-j/cinema-booking-api.git
cd cinema-booking-api
```

2. Copy the environment template:
```
cp .env.example .env
```

3. Fill in `JWT_SECRET`, `TICKET_SECRET`, and `DATABASE_URL` in `.env` (defaults work out of the box for Docker; see comments in `.env.example`)

4. Start everything:
```
docker compose up --build
```

This spins up Postgres, runs pending migrations automatically via a one-off `migrate` container, then starts the API.

API will be available at `http://localhost:7000`

### Option 2 — Local

1. Clone and install dependencies:
```
git clone https://github.com/kubrak-j/cinema-booking-api.git
cd cinema-booking-api
npm install
```

2. Copy the environment template and point `DATABASE_URL` at your local Postgres instance:
```
cp .env.example .env
```

3. Run migrations and start:
```
npx prisma migrate dev
npm run start:dev
```

## 🔑 Authentication

Most endpoints require a JWT token. After login, include it in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

Admin endpoints additionally require the `ADMIN` role.

Admin endpoints additionally require the `ADMIN` role.

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /auth/register | Public | Register a new user |
| POST | /auth/login | Public | Login, returns JWT token |

### Movies
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /movies | Public | Get all movies |
| GET | /movies/:id | Public | Get movie by ID |
| POST | /movies | Admin | Add a new movie |
| PATCH | /movies/:id | Admin | Update a movie |
| DELETE | /movies/:id | Admin | Delete a movie |

### Sessions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /sessions | Public | Get all sessions |
| GET | /sessions/:id | Public | Get session by ID |
| POST | /sessions | Admin | Create a session |
| PATCH | /sessions/:id | Admin | Update a session |
| DELETE | /sessions/:id | Admin | Delete a session |

### Halls & Seats
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /halls | Public | Get all halls |
| GET | /halls/:id | Public | Get hall by ID, including its seats |
| POST | /halls | Admin | Create a hall from a seat-layout matrix |
| PATCH | /halls/:id | Admin | Update a hall |
| DELETE | /halls/:id | Admin | Delete a hall |
| GET | /halls/:hallId/seats/:seatId | Public | Get a specific seat |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /bookings | User | Get current user's bookings |
| GET | /bookings/:id | User | Get booking by ID |
| POST | /bookings | User | Book a seat |
| DELETE | /bookings/:id | User | Cancel a booking |

## 🧪 API Testing (Postman)

The project includes a Postman collection under `api/postman/` so recruiters, reviewers, or collaborators can test the API manually without extra setup.

### How to use it
1. Start the API locally or with Docker.
2. Import the collection from `api/postman/` into Postman.
3. Set the `{{baseUrl}}` variable — `http://localhost:7000` works for both local and Docker setups, since Docker exposes the same port to your host machine.
4. Register a user via `POST /auth/register` or log in via `POST /auth/login` — the login request automatically saves the returned token into `{{jwt_token}}`.
5. Protected requests use `Authorization: Bearer {{jwt_token}}` automatically.

### Notes
- The collection uses variables rather than hardcoded secrets.
- No real `.env` values, JWT tokens, or database credentials are stored in the collection.

## 🗄️ Database Schema

- **User** — registered users with roles (USER / ADMIN)
- **Movie** — films with description, duration, age rating
- **Hall** — cinema halls, each with a set of seats
- **Seat** — individual seats within a hall, with row/number/category
- **Session** — screenings linked to a movie and hall, with date and status
- **Booking** — seat reservations linked to user and session, with a unique constraint on `(sessionId, seatId)` to prevent double booking

## 🐳 Docker Architecture

The Docker setup uses three services:
- **db** — PostgreSQL, with a healthcheck gating startup order
- **migrate** — a one-off container that runs `prisma migrate deploy` against the database, then exits (this is expected — it's not a hung process)
- **server** — the API itself, starts only after migrations complete successfully

The runtime image is kept lightweight: the Prisma CLI and its tooling are only present in the build stage and the `migrate` image, never in the `server` image that runs long-term.
