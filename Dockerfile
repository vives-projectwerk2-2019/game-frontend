FROM node:10 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod


FROM nginx:1.15
WORKDIR /app
COPY --from=build /app /usr/share/nginx/html
EXPOSE 80