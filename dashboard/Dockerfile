# --- STAGE 1: Build ---
FROM node:20-alpine AS builder
RUN echo $DB_URL
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build

# --- STAGE 2: Run ---
FROM node:20-alpine AS runner
WORKDIR /app
RUN echo $DB_URL
ENV NODE_ENV=production

# Next.js standalone mode needs these specific files:
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
# In standalone mode, Next.js creates a server.js file
CMD ["node", "server.js"]