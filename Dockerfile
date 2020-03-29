FROM nginx
MAINTAINER geogracom.com

COPY dist /usr/share/nginx/html
COPY nginx.conf /usr/share/nginx

EXPOSE 80
