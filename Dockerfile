FROM mcr.microsoft.com/playwright:v1.54.1-noble

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# Run all tests
CMD ["npx", "playwright", "test", "--reporter=html"]