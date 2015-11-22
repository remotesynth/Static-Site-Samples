#
# Build: docker build -t jekyll-adventuretime .
# Run:   docker run -d -p 14000:4000 jekyll-adventuretime
#
FROM ruby:2.2.3

RUN gem install jekyll
ADD . /srv/jekyll
WORKDIR /srv/jekyll
ENTRYPOINT jekyll serve --host 0.0.0.0
EXPOSE 4000
