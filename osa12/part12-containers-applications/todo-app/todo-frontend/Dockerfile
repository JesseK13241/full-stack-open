# Build stage
FROM node:20 AS build-stage 

ENV VITE_BACKEND_URL="http://localhost:5173/"

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# Test stage
FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test

# Production stage
FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
