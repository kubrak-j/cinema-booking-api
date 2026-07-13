#!/bin/sh
# Docker entrypoint script
# Generate .env file from environment variables if not present

if [ ! -f .env ]; then
  echo "Generating .env from environment variables..."
  echo "PORT=${PORT}" > .env
  echo "DATABASE_URL=${DATABASE_URL}" >> .env
  echo "JWT_SECRET=${JWT_SECRET}" >> .env
  echo "TICKET_SECRET=${TICKET_SECRET}" >> .env
fi

# Run Prisma migrations
echo "Running database migrations..."
npx prisma migrate deploy

exec npm start
