FROM nginx:1.15

WORKDIR /app

COPY . /usr/share/nginx/html

EXPOSE 80