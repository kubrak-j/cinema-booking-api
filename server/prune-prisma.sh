#!/bin/sh
set -e

# Prisma CLI (`prisma` package) is a peer dependency of @prisma/client and
# gets auto-installed by npm regardless of dev/prod split. We only need the
# already-generated node_modules/.prisma + node_modules/@prisma/client at
# runtime — never the CLI itself. Its transitive deps get npm-hoisted to
# top-level node_modules, so they must be listed explicitly.

# Prisma Studio (bundles its own UI framework)
rm -rf node_modules/@prisma/studio-core
rm -rf node_modules/react node_modules/react-dom
rm -rf node_modules/@radix-ui node_modules/chart.js node_modules/@kurkle

# Other DB drivers/sync tooling Prisma supports but this project doesn't use
rm -rf node_modules/mysql2 node_modules/postgres
rm -rf node_modules/@electric-sql node_modules/hono node_modules/@hono

# Prisma CLI itself + its own build/dev/codegen tooling
rm -rf node_modules/prisma
rm -rf node_modules/@prisma/dev node_modules/@prisma/engines
rm -rf node_modules/@prisma/fetch-engine node_modules/@prisma/get-platform
rm -rf node_modules/@prisma/engines-version
rm -rf node_modules/@prisma/query-plan-executor
rm -rf node_modules/@prisma/streams-local node_modules/@prisma/config
rm -rf node_modules/typescript node_modules/tsx
rm -rf node_modules/esbuild node_modules/@esbuild

# Validation/testing libs pulled in by Prisma CLI's internals, unused at runtime
rm -rf node_modules/effects node_modules/remeda node_modules/fast-check
rm -rf node_modules/valibot node_modules/ajv node_modules/jiti node_modules/pure-rand

# TS type declarations — useless at runtime
rm -rf node_modules/@types

echo "Pruned Prisma CLI/Studio and unused transitive deps"
