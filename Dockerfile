FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

# 루트 패키지 (프론트 빌드)
COPY package*.json ./
RUN npm ci

# 소스 복사 및 프론트 빌드
COPY . .
RUN npm run build

# 서버 의존성
WORKDIR /app/server
RUN npm ci --omit=dev

# 실행
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

WORKDIR /app
CMD ["npm", "run", "start:server"]
