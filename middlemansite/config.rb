###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  # Matcher for blog source files
  blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.summary_separator = "<!--more-->"
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

end

page "/feed.xml", layout: false

# Reload the browser automatically whenever files change
  activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :site_title, 'Adventure Time!'
set :banner, '/images/about.jpg'
set :description, 'Adventure Time is an American animated television series created by Pendleton Ward for Cartoon Network. The series follows the adventures of Finn, a human boy, and his best friend and adoptive brother Jake, a dog with magical powers to change shape and grow and shrink at will. Finn and Jake live in the post-apocalyptic Land of Ooo. Along the way, they interact with the other main characters of the show: Princess Bubblegum, The Ice King, and Marceline the Vampire Queen.'
