# Stage 1: Build Create React App
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --legacy-peer-deps --silent

COPY . .
RUN npm run build

# Stage 2: Serve static build with Nginx
FROM nginx:1.25-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
