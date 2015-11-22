#
# Build: docker build -t craigbarrau/jekyll-sample
# Run:   docker run -t -v jekyllsite:/srv/jekyll craigbarrau/jekyll-sample
#
FROM ruby:2.2.3

RUN gem install jekyll
WORKDIR /srv/jekyll
ENTRYPOINT jekyll serve --host 0.0.0.0
EXPOSE 4000
