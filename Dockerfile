FROM node:8.9
RUN yarn global add http-serve@1.0.1
WORKDIR /opt/app/
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
EXPOSE 8080
ENTRYPOINT [ "http-serve", \
  "-P", "http://backend:8080/", \
  "-p", "8080",  \
  "./dist/" ]