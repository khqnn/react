FROM alpine AS base
RUN apk add --update yarn
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --production

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# # For NextJs
# FROM alpine AS base
# RUN apk add --update yarn nodejs
# WORKDIR /app

# FROM base AS deps
# COPY package.json yarn.lock /app/
# RUN yarn install --production

# FROM base AS builder
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# ENV NODE_OPTIONS=--openssl-legacy-provider
# RUN yarn build


# FROM base AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000
# ENV PORT=3000
# CMD ["yarn", "start"]
