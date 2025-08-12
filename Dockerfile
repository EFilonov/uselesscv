# Объявление ARG 
ARG MONGO_URI
ARG AUTH_SECRET
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG AUTH_GITHUB_ID
ARG AUTH_GITHUB_SECRET
ARG MAIL_REFRESH_TOKEN
ARG EMAIL_FROM
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
#  Contentful переменные
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_ENVIRONMENT
ARG CONTENTFUL_MANAGEMENT_TOKEN

FROM node:20-alpine AS base

# Установка ENV для базового образа
ENV MONGO_URI=$MONGO_URI
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
ENV AUTH_GITHUB_ID=$AUTH_GITHUB_ID
ENV AUTH_GITHUB_SECRET=$AUTH_GITHUB_SECRET
ENV MAIL_REFRESH_TOKEN=$MAIL_REFRESH_TOKEN
ENV EMAIL_FROM=$EMAIL_FROM
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY
#  Contentful ENV
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT
ENV CONTENTFUL_MANAGEMENT_TOKEN=$CONTENTFUL_MANAGEMENT_TOKEN

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat bash python3

# Оптимизированная установка пакетных менеджеров
RUN corepack enable \
    && corepack prepare yarn@stable --activate \
    && corepack prepare pnpm@latest --activate \
    && npm install -g npm@latest

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
    elif [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ENV NODE_ENV=production

# Пробрасываем переменные окружения для этапа сборки
ENV MONGO_URI=$MONGO_URI
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
ENV AUTH_GITHUB_ID=$AUTH_GITHUB_ID
ENV AUTH_GITHUB_SECRET=$AUTH_GITHUB_SECRET
ENV MAIL_REFRESH_TOKEN=$MAIL_REFRESH_TOKEN
ENV EMAIL_FROM=$EMAIL_FROM
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY
# Contentful для builder
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT
ENV CONTENTFUL_MANAGEMENT_TOKEN=$CONTENTFUL_MANAGEMENT_TOKEN

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Пробрасываем переменные окружения для запуска
ENV MONGO_URI=$MONGO_URI
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
ENV AUTH_GITHUB_ID=$AUTH_GITHUB_ID
ENV AUTH_GITHUB_SECRET=$AUTH_GITHUB_SECRET
ENV MAIL_REFRESH_TOKEN=$MAIL_REFRESH_TOKEN
ENV EMAIL_FROM=$EMAIL_FROM
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY
# Добавьте Contentful для runner
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_ENVIRONMENT=$CONTENTFUL_ENVIRONMENT
ENV CONTENTFUL_MANAGEMENT_TOKEN=$CONTENTFUL_MANAGEMENT_TOKEN

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
