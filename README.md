# Cinema Booking API

A REST API for a cinema booking system. Built to master authentication, relational database design, and role-based access control.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Zod
- **Auth:** JWT + bcrypt
- **Container:** Docker

## ✅ Roadmap

### Phase 1 — Foundation
- [ ] Project setup (Express, TypeScript, Prisma, Zod)
- [ ] Database schema (User, Movie, Session, Booking)
- [ ] GET /movies — list all movies
- [ ] GET /sessions — list all sessions

### Phase 2 — Authentication
- [ ] POST /auth/register — user registration
- [ ] POST /auth/login — login, returns JWT token
- [ ] Auth middleware — protect routes with JWT

### Phase 3 — Admin Features
- [ ] POST /movies — admin adds a movie
- [ ] POST /sessions — admin creates a session
- [ ] DELETE /movies/:id — admin deletes a movie
- [ ] Role-based middleware (USER / ADMIN)

### Phase 4 — Booking
- [ ] POST /bookings — user books a seat
- [ ] GET /bookings/me — user views their bookings
- [ ] DELETE /bookings/:id — user cancels a booking
- [ ] Seat availability validation

### Phase 5 — Payments (future)
- [ ] Payment integration

### Phase 6 — Frontend (future)
- [ ] Frontend client

## 📦 Installation & Setup

1. Clone the repository:
```
git clone https://github.com/kubrak-j/cinema-booking-api.git
cd cinema-booking-api
```

2. Install dependencies:
```
npm install
```

3. Configure environment:
```
cp .env.example .env
```

4. Run with Docker:
```
docker-compose up --build
```

Or run locally:
```
npx prisma migrate dev
npm run dev
```

## 🗄️ Database Schema

- **User** — registered users with roles (USER / ADMIN)
- **Movie** — films with description, duration, age limit
- **Session** — screenings with date, time, movie reference
- **Booking** — seat reservations linked to user and session
