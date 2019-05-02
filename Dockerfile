FROM node:10 as build

ARG MQTT_BROKER_HOST=game.bug.labict.be
ARG MQTT_BROKER_PORT=443
ARG MQTT_BROKER_PATH=/broker
ARG MQTT_BROKER_USE_SSL=true
ARG GAME_TOPIC=game1337

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod


FROM nginx:1.15
WORKDIR /app
COPY --from=build /app /usr/share/nginx/html
EXPOSE 80