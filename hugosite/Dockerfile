#
# Build: docker build -t hugo-adventuretime .
# Run:   docker run -d -p 11313:1313 hugo-adventuretime
#
FROM debian:wheezy
MAINTAINER cbarr.aus@gmail.com

# Install pygments (for syntax highlighting) 
RUN apt-get -qq update \
	&& DEBIAN_FRONTEND=noninteractive apt-get -qq install -y --no-install-recommends python-pygments \
	&& rm -rf /var/lib/apt/lists/*
# Download and install hugo
ENV HUGO_VERSION 0.14
ENV HUGO_BINARY hugo_${HUGO_VERSION}_linux_amd64
ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz /usr/local/
RUN tar xzf /usr/local/${HUGO_BINARY}.tar.gz -C /usr/local/ \
	&& ln -s /usr/local/${HUGO_BINARY}/${HUGO_BINARY} /usr/local/bin/hugo \
	&& rm /usr/local/${HUGO_BINARY}.tar.gz
ADD . /svr/hugo
WORKDIR /svr/hugo
ENTRYPOINT hugo server --bind="0.0.0.0"
EXPOSE 1313
