# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
	# ...
    templateData:
        site:
            title: "Adventure Time!"
            description: "Adventure Time is an American animated television series created by Pendleton Ward for Cartoon Network. The series follows the adventures of Finn, a human boy, and his best friend and adoptive brother Jake, a dog with magical powers to change shape and grow and shrink at will. Finn and Jake live in the post-apocalyptic Land of Ooo. Along the way, they interact with the other main characters of the show: Princess Bubblegum, The Ice King, and Marceline the Vampire Queen."
            banner: "/images/about.jpg"
        getPreparedTitle: ->
            # if we have a document title, then we should use that and suffix the site's title onto it
            if @document.title
                "#{@document.title} | #{@site.title}"
            # if our document does not have its own title, then we should just use the site's title
            else
                @site.title
        getCuttedContent: (content) ->            
                i = content.search('<!--more-->')
                if i >= 0
                    content[0..i-1]                
                else
                    content
    collections:
        posts: ->
            @getCollection("html").findAllLive({relativeOutDirPath: 'posts'},[{date:-1}])
        data: ->
            @getCollection("files").findAllLive({relativeOutDirPath: 'data'})
    plugins:
        rss:
            default:
                collection: 'posts'
}

# Export the DocPad Configuration
module.exports = docpadConfig