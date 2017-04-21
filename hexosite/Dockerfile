#
# Build: docker build -t hexo-adventuretime .
# Run:   docker run -d -p 24000:4000 hexo-adventuretime
#
FROM node:5.0.0-slim
MAINTAINER cbarr.aus@gmail.com

RUN npm install -g hexo-cli hexo-server

ADD . /srv/hexo
WORKDIR /srv/hexo
ENTRYPOINT npm install hexo-server --save && hexo server
EXPOSE 4000
