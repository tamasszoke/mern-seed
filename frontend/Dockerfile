# Development
FROM node:18-alpine
RUN apk add --no-cache g++ make py3-pip
WORKDIR /frontend
COPY package*.json /frontend/
RUN yarn install
COPY . /frontend/
EXPOSE 3000
EXPOSE 35729
CMD ["yarn", "start"]
