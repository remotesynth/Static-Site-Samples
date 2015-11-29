# Static Site Samples

  * [Assumptions](#jekyll-example)
  * [Quickstart Instructions](#quickstart-instructions)
  * Examples
    * [Jekyll](#jekyll-example)
    * [Middleman](#middleman-example)
    * [Harp](#harp-examples)
    * [Wintersmith](#wintersmith-example)
    * [Hexo](#hexo-example)
    * [Hugo](#hugo-example)

This is a simple example site built using various static site generators to explore the differences between the multitude of available static site options.

The initial samples are [Jekyll](http://jekyllrb.com/), [HarpJS](http://harpjs.com/), [Middleman](https://middlemanapp.com/), [Wintersmith](http://wintersmith.io/), [Hexo](http://hexo.io/) and [Hugo](http://gohugo.io/). More to come.

Sample text and images are taken from the [Adventure Time! Wiki](http://adventuretime.wikia.com/wiki/Adventure_Time_with_Finn_and_Jake_Wiki).

The sample project looks the same in all cases. It was designed to cover specific use cases that are common, basic requirements for a site:

* Custom global data
* Custom post data
* Custom data collections
* Post summaries (i.e. specifying a break point in the text for a summary)
* RSS Feed
* Date display formatting

![sample project](sample-project.png)

##Assumptions

In order to make "fair" comparisons, all of the examples are (initially) built using the default templating language. If an engine supports multiple defaults, the sample is built with the language used in the generated templates (for example, Harp supports Jade and EJS by default but the generated templates use Jade, so the initial sample was built with Jade).

The "ratings" in the presentation represent my own personal opinion. Given the stylistic differences between each project, your opinion may differ greatly. For example, those comfortable with Ruby may feel that Middleman is quite easy to use (however, I am not a Ruby developer).

## Quickstart Instructions

If you want to save yourself time by using containers to run the examples, there is a simple `adventure-time.sh` utility that simplifies the interaction with Docker. No Docker knowledge is required. This is a great approach if you want to try out each technology without having to have anything installed on your target host (other than Docker, of course). Alternatively, you can build from scratching using the individual Dockerfiles or follow the steps for installing each technology manually 
  * [Jekyll Example](#jekyll-example)
  * [Middleman Example](#middleman-example)
  * [Harp Example](#harp-examples)
  * [Wintersmith Example](#wintersmith-example)
  * [Hexo Example](#hexo-example)
  * [Hugo Example](#hugo-example)

The `./adventure-time.sh` utility can be used to boot one or more of the Adeventure Time static site samples immediately. The tool will:

1. Use Docker to automatically download and customise the necessary container images.
2. Use Docker to maps the static site source from the target host to the container guest. This means that you can make changes directly on your host machine and they will be immediately reflected in the container guest. This is achieved by the Docker host to guest volume mapping feature and auto-reload capability of the respective static site software. All of this magic is simply encapsulated in the `Dockerfile`s and `adventure-time.sh`.  
Note: If you need to install docker on most Linux operating systems you can simply run `curl -sSL https://get.docker.com/ | sh`. For more detailed instructions visit https://docs.docker.com/engine/installation/

To see the usage simply run  
`sudo ./adventure-time.sh`

To use Docker to boot a static site run  
`sudo ./adventure-time.sh <site>`

For example, to run Jekyll Adventure Time sample run this:  
`sudo ./adventure-time.sh jekyll`

Or if you want to boot all the static sites at the same time you can run this:  
`sudo ./adventure-time.sh -a`

By defaults the static sites listen on the following ports  

| Site | Link |
| ------------- | ------------- | 
| Jekyll | http://localhost:14000 |
| Middleman | http://localhost:14567 |
| Harp EJS | http://localhost:19000 |
| Harp EJS | http://localhost:29000 |
| Wintersmith | http://localhost:28080 |

If you want to run without sudo, simply add the current user to the docker group on your operating system. 

##Jekyll Example

To get started, you'll need to install Jekyll (no official Windows support is available but a [workaround](http://jekyllrb.com/docs/windows/#installation) is available. Jekyll is Ruby-based.

    sudo gem install jekyll

Once you have Jekyll installed, simply change directory into the sample and start a local server:

    cd jekyllsite
    jekyll serve

The Jekyll samples are built with the [Liquid template engine](https://github.com/Shopify/liquid) and YAML for the data (YAML was chosen because the default templates use YAML for data, although JSON and CSV are supported).

For a thorough tutorial on how to use Jekyll and how the sample site was built, read [this article on the Telerik Developer Network](http://developer.telerik.com/featured/getting-started-with-jekyll/).

##Middleman Example

Middleman is also Ruby-based but does officially support Windows via [RubyInstaller](http://rubyinstaller.org/). To install Middleman, use:

    sudo gem install middleman

Once you have Middleman installed, first change directory into the sample. The example uses a [LiveReload plugin](https://github.com/middleman/middleman-livereload), so you will need to install the bundles specified in the Gem file before starting the server. Then, start the server.

    cd middlemansite
    bundle install
    middleman

The Middleman examples are built using the [Erb](http://ruby-doc.org/stdlib-2.2.0/libdoc/erb/rdoc/) templating language and YAML for the data.

##Harp Examples

Harp is available via npm. To install it, simple enter (the `sudo` is not necessary on Windows):

    sudo npm install -g harp

Harp has two examples. The initial example was built using the [Jade templating language](http://jade-lang.com/) and JSON for data. While Harp supports both Jade and EJS by default, the generated templates use Jade, so it was chosen initially. To run this example simply change directory into the sample folder and start a local server.

    cd harpsite
    harp server

By default, Harp supports both Jade and [EJS](http://www.embeddedjs.com/). A second sample was built with Harp and EJS.

    cd harpsite_ejs
    harp server

##Wintersmith Example

Wintersmith is also available via npm (again the `sudo` is not necessary on Windows):

    sudo npm install -g wintersmith

To run the project on a local server, simply change directory and start a preview:

    cd wintersmithsite
    wintersmith preview

Wintersmith comes bundled with Jade templating support. The data uses JSON.

For a detailed walkthrough covering how the Wintersmith example site was built and check out the two part series on Sitepoint:

* [Getting Started with Wintersmith: A Node.js-based Static Site Generator](http://www.sitepoint.com/getting-started-wintersmith-nodejs-static-site-generator/)
* [Creating Posts, Custom Metadata, and Data in Wintersmith](http://www.sitepoint.com/creating-posts-custom-metadata-data-wintersmith/)

##Hexo Example

Hexo is also available via npm (again the `sudo` is not necessary on Windows):

    sudo npm install hexo-cli -g

To run the project on a local server, simply change directory and start a preview:

    cd hexosite
    npm install
    hexo server

Hexo comes bundled with both EJS and Swig templating support (the generated starter uses EJS, so this was chosen). The data uses YAML.

##Hugo Example

Hugo is built with the Go programming language. There are a number of OS-specific [installable downloads](https://github.com/spf13/hugo/releases) or, if you are on OSX, you can install Hugo via [Brew](http://brew.sh/):

    brew install hugo

To run the example, change directory and start a local server preview:

    cd hugosite
    hugo server

Hugo templates are built with the Go html/template library. Data files are TOML.
