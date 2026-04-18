FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .

USER node

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "app.js"]
