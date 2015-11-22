#
# Build: docker build -t harp-adventuretime .
# Run:   docker run -d -p 19000:9000 harp-adventuretime
#
FROM node:5.0.0-slim
MAINTAINER cbarr.aus@gmail.com

RUN npm install -g harp

ADD . /srv/harp
WORKDIR /srv/harp
ENTRYPOINT harp server
EXPOSE 9000
