FROM nginx
MAINTAINER geogracom.com

COPY dist /usr/share/nginx/html

EXPOSE 80
