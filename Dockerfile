# Production
FROM keymetrics/pm2:8-alpine
WORKDIR /app
COPY /build/package*.json /app/
RUN npm install
COPY /build/ /app/
EXPOSE 80
CMD ["npm", "start"]
