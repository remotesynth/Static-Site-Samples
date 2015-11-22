#
# Build: docker build -t harp-ejs-adventuretime .
# Run:   docker run -d -p 19000:9000 harp-ejs-adventuretime
#
FROM node:5.0.0-slim

RUN npm install -g harp

ADD . /srv/harp
WORKDIR /srv/harp
ENTRYPOINT harp server
