# Build container: Node LTS
FROM node:lts as build

WORKDIR /usr/app/
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN node_modules/.bin/ng build --configuration production

# Runtime container: NGINX
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/app/dist/angular-dropzone /usr/share/nginx/html

