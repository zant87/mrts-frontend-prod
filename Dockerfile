FROM nginx
MAINTAINER geogracom.com

ADD dist /usr/share/nginx/html
COPY ./nginx.conf /usr/share/nginx/conf

EXPOSE 80
