#!/bin/sh

set -e

npx prisma generate

echo "Running database migrations..."

npx prisma migrate deploy

echo "Starting application..."

exec npm start
