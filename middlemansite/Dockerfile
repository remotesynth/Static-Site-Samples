#
# Build: docker build -t middleman-adventuretime .
# Run:   docker run -d -p 14567:4567 middleman-adventuretime
#
FROM ruby:2.2.3

RUN apt-get update \
    && apt-get install -y \
	nodejs
ADD . /srv/middleman
WORKDIR /srv/middleman
RUN bundle install
ENTRYPOINT middleman
