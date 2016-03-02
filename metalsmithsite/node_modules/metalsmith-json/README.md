metalsmith-json
===============

Metalsmith plugin which parses json files and exposes their properties as metadata on the file object

Adding this plugin to your chain will result in any `.json` files being parsed, and their properties accumulated under a 
key (default: data) on the file object.

[Blog post](http://www.abm.io/implementing-a-metalsmith-plugin/) which led to creation of this plugin.

### CLI Usage

in metalsmith.json

```js
{
    "source": "src",
    "destination": "output",
    "plugins": {
        "metalsmith-json": {
        	"key": "foo"
        },
    }
}
```

### Options

#### options.key
Type: `String`  
Default value: `data`  
Description: Key the json properties should be accumulated under

### Development

There's a gruntfile for running jshint as well as unit and integration tests, please use it If you intend to submit pull 
requests.