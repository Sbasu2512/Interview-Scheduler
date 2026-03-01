# ---------- Stage 1: Build React ----------
FROM node:20-alpine AS client-build

WORKDIR /app/client

# Install client dependencies
COPY client/package*.json ./
RUN npm install

# Copy client source
COPY client ./

# Build production React app
RUN npm run build


# ---------- Stage 2: Build API ----------
FROM node:20-alpine

WORKDIR /app

# Install API dependencies
COPY scheduler-api/package*.json ./scheduler-api/
RUN cd scheduler-api && npm install

# Copy API source
COPY scheduler-api ./scheduler-api

# Copy built React files into API folder
COPY --from=client-build /app/client/build ./client/build

# Set working directory to API
WORKDIR /app/scheduler-api

# Expose Render port (Render injects PORT env variable)
EXPOSE 8001

# Start API
CMD ["npm", "start"]