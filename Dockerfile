# ---------- Stage 1: Build React ----------
FROM node:20-alpine AS client-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client ./
RUN npm run build


# ---------- Stage 2: Final Image ----------
FROM node:20-alpine

# Install git (needed for submodules)
RUN apk add --no-cache git

WORKDIR /app

# Copy entire repo (including .git)
COPY . .

# Initialize submodules
RUN git submodule update --init --recursive

# Install API dependencies
WORKDIR /app/scheduler-api
RUN npm install

# Copy built React files into API
COPY --from=client-build /app/client/build /app/client/build

# Expose port
EXPOSE 8001

# Start server
CMD ["npm", "start"]