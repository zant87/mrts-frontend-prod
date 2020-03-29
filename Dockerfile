FROM nginx
MAINTAINER geogracom.com

ADD dist /usr/share/nginx/html
COPY nginx.conf /usr/share/nginx/conf/nginx.conf
COPY nginx.conf /etc/nginx/conf/nginx.conf


EXPOSE 80
