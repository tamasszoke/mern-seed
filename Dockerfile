# Production
FROM node:18-alpine
WORKDIR /app
COPY /build/package*.json /app/
RUN yarn install
COPY /build/ /app/
EXPOSE 8080
CMD ["yarn", "prod"]
