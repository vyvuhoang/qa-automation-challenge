FROM mcr.microsoft.com/playwright:v1.54.1-noble

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
RUN npx playwright install msedge
RUN npx playwright install chrome