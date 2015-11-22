#
# Build: docker build -t wintersmith-adventuretime .
# Run:   docker run -d -p 28080:8080 wintersmith-adventuretime
#
FROM node:5.0.0-slim

RUN npm install -g wintersmith

ADD . /srv/wintersmith
WORKDIR /srv/wintersmith
ENTRYPOINT wintersmith preview
