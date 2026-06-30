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
- [x] Project setup (Express, TypeScript, Prisma, Zod)
- [x] Database schema (User, Movie, Session, Booking)
- [x] GET /movies — list all movies
- [x] GET /sessions — list all sessions

### Phase 2 — Authentication
- [x] POST /auth/register — user registration
- [x] POST /auth/login — login, returns JWT token
- [x] Auth middleware — protect routes with JWT

### Phase 3 — Admin Features
- [x] POST /movies — admin adds a movie
- [x] POST /sessions — admin creates a session
- [x] DELETE /movies/:id — admin deletes a movie
- [x] Role-based middleware (USER / ADMIN)

### Phase 4 — Booking
- [x] POST /bookings — user books a seat
- [x] GET /bookings/me — user views their bookings
- [x] DELETE /bookings/:id — user cancels a booking
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
