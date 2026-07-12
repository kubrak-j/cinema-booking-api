# Cinema Booking API

A REST API for a cinema booking system. Built to master authentication, relational database design, and role-based access control.

## 🌐 Live Demo

API is deployed and available at:
**https://cinema-booking-api-hbld.onrender.com**

> Note: Free tier — first request after inactivity may take 30-60 seconds to wake up.

Example: `GET https://cinema-booking-api-hbld.onrender.com/movies`

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
- [x] Docker integration

### Phase 2 — Authentication
- [x] POST /auth/register — user registration
- [x] POST /auth/login — login, returns JWT token
- [x] Auth middleware — protect routes with JWT

### Phase 3 — Admin Features
- [x] POST /movies — admin adds a movie
- [x] PATCH /movies/:id — admin updates a movie
- [x] DELETE /movies/:id — admin deletes a movie
- [x] POST /sessions — admin creates a session
- [x] PATCH /sessions/:id — admin updates a session
- [x] DELETE /sessions/:id — admin deletes a session
- [x] Role-based middleware (USER / ADMIN)

### Phase 4 — Booking
- [x] POST /bookings — user books a seat
- [x] GET /bookings — user views their bookings
- [x] GET /bookings/:id — user views a specific booking
- [x] DELETE /bookings/:id — user cancels a booking
- [x] Seat availability validation (code + database constraint)

### Phase 5 — Payments (future)
- [ ] Payment integration

### Phase 6 — Frontend (future)
- [ ] Frontend client

## 📦 Installation & Setup

### Option 1 — Docker (recommended)

1. Clone the repository:
```
git clone https://github.com/kubrak-j/cinema-booking-api.git
cd cinema-booking-api
```

2. Create `.env` file:
```
cp .env.example .env
```

3. Fill in your `JWT_SECRET` in `.env`

4. Start with Docker:
```
docker compose up --build
```

API will be available at `http://localhost:7000`

### Option 2 — Local

1. Clone and install dependencies:
```
git clone https://github.com/kubrak-j/cinema-booking-api.git
cd cinema-booking-api
npm install
```

2. Create `.env` file and fill in `DATABASE_URL` and `JWT_SECRET`:
```
cp .env.example .env
```

3. Run migrations and start:
```
npx prisma migrate dev
npm run dev
```

## 🔑 Authentication

Most endpoints require a JWT token. After login, include it in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

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

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /bookings | User | Get current user's bookings |
| GET | /bookings/:id | User | Get booking by ID |
| POST | /bookings | User | Book a seat |
| DELETE | /bookings/:id | User | Cancel a booking |

## 🧪 API Testing (Postman)

The project includes a Postman collection under the `postman/` folder so recruiters, reviewers, or collaborators can test the API manually without needing extra setup.

### How to use it
1. Start the API locally or with Docker.
2. Open Postman and import the collection from the `postman/collections/` directory.
3. Set the `{{baseUrl}}` variable to the running API URL, for example:
   - `http://localhost:7000` for local development
   - `http://localhost:7000` for Docker-based setup
4. Register a user through `POST /auth/register` or log in through `POST /auth/login`.
5. Use the returned JWT token for protected requests such as booking endpoints.

### Notes
- The collection uses variables rather than hardcoded secrets.
- No `.env` values, JWT tokens, or database credentials are stored in the collection files.
- For protected requests, the token should be stored in the Postman variable named `{{jwt_token}}` after login.

### Example request
```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

For secured routes, send:
```http
Authorization: Bearer {{jwt_token}}
```
### ⚡ Quick Testing via VS Code (REST Client)

If you prefer staying inside your editor, the repository also includes lightweight HTTP test files located in the `http-tests/` directory.

#### How to use:
1. Install the official **REST Client** extension for VS Code (by Huachao Mao).
2. Open `http-tests/auth.http` and click the **Send Request** link above the `POST /auth/login` request.
3. Copy the returned `token` from the response window.
4. Open any other file (e.g., `bookings.http`, `movies.http`), paste your token into the `@authToken = ...` variable at the top of the file, and save.
5. Now you can instantly run any protected endpoint directly from VS Code by clicking **Send Request** above it.


## 🗄️ Database Schema

- **User** — registered users with roles (USER / ADMIN)
- **Movie** — films with description, duration, age limit
- **Session** — screenings linked to a movie with date and status
- **Booking** — seat reservations linked to user and session, with unique constraint on `(sessionId, seat)` to prevent double booking
