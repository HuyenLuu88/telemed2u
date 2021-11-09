# build environment
FROM node:14.0.0-alpine as build
WORKDIR /app
RUN apk update && apk add python2 make g++
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
# COPY yarn.lock ./
RUN yarn install
RUN yarn global add react-scripts@3.4.1
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]