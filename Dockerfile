#FROM nginx
#MAINTAINER Geogracom.com
#
#COPY build /usr/share/nginx/html

#EXPOSE 80

# этап сборки (build stage)
FROM node as build-stage
MAINTAINER geogracom.com
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# этап production (production-stage)
FROM nginx as production-stage
MAINTAINER geogracom.com
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

