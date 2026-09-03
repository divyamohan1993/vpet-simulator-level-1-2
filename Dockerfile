FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production \
    PORT=8080

COPY --chown=node:node package.json server.mjs ./
COPY --chown=node:node scripts ./scripts
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
RUN node scripts/build.mjs

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1

CMD ["node", "server.mjs"]
