# Build container: Node LTS
FROM node:lts as build

WORKDIR /usr/app/
COPY package.json /usr/app/
RUN npm install
COPY . /usr/app/
RUN node_modules/.bin/ng build --prod

# Runtime container: NGINX
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/app/dist /usr/share/nginx/html

