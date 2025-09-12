# stage: BUILD
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .

# ✅ Skip ESLint for faster production build
ENV NEXT_DISABLE_ESLINT=1
RUN npm run build

# stage: RUN
FROM node:22-alpine AS runner

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
