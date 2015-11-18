# metalsmith-layouts

[![npm](https://img.shields.io/npm/v/metalsmith-layouts.svg)](https://www.npmjs.com/package/metalsmith-layouts) [![Build Status](https://travis-ci.org/superwolff/metalsmith-layouts.svg)](https://travis-ci.org/superwolff/metalsmith-layouts) [![Dependency Status](https://david-dm.org/superwolff/metalsmith-layouts.svg)](https://david-dm.org/superwolff/metalsmith-layouts) [![devDependency Status](https://david-dm.org/superwolff/metalsmith-layouts/dev-status.svg)](https://david-dm.org/superwolff/metalsmith-layouts#info=devDependencies) [![npm](https://img.shields.io/npm/dm/metalsmith-layouts.svg)](https://www.npmjs.com/package/metalsmith-layouts)

> A metalsmith plugin for layouts

This plugin allows you to apply layouts to your source files. It passes your source files to the selected layout as `contents` and renders the result with the templating engine of your choice. You can use any templating engine supported by [consolidate.js](https://github.com/tj/consolidate.js#supported-template-engines).

## Installation

```bash
$ npm install metalsmith-layouts
```

## Example

Configuration in `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-layouts": {
      "engine": "handlebars"
    }
  }
}
```

Source file `src/index.html`:

```html
---
layout: layout.html
title: The title
---
<p>The contents</p>
```

Layout `layouts/layout.html`:

```html
<!doctype html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  {{{contents}}}
</body>
</html>
```

Results in `build/index.html`:

```html
<!doctype html>
<html>
<head>
  <title>The title</title>
</head>
<body>
  <p>The contents</p>
</body>
</html>
```

This is a very basic example. For a ready-to-use boilerplate that utilizes this plugin see [metalsmith-boilerplates](https://github.com/superwolff/metalsmith-boilerplates).

## Options

You can pass options to `metalsmith-layouts` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are:

* [engine](#engine): templating engine (required)
* [default](#default): default template (optional)
* [directory](#directory): directory for the layouts, layouts by default (optional)
* [partials](#partials): directory for the partials (optional)
* [pattern](#pattern): only files that match this pattern will be processed (optional)

### engine

The engine that will render your layouts. Metalsmith-layouts uses [consolidate.js](https://github.com/tj/consolidate.js) to render templating syntax, so any engine [supported by consolidate.js](https://github.com/tj/consolidate.js#supported-template-engines) can be used. Don't forget to install the templating engine separately. So this `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-layouts": {
      "engine": "swig"
    }
  }
}
```

Will render your layouts with swig.

### default

The default layout to use. Can be overridden with the `layout` key in each file's YAML frontmatter. If a `default` layout hasn't been specified, `metalsmith-layouts` will only process files with a `layout` option in their front-matter. Don't forget to specify the file extension. So this `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-layouts": {
      "engine": "swig",
      "default": "default.html"
    }
  }
}
```

Will apply the `default.html` layout to all files, unless specified otherwise in the frontmatter.

### directory

The directory where `metalsmith-layouts` looks for the layouts. By default this is `layouts`. So this `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-layouts": {
      "engine": "swig",
      "directory": "templates"
    }
  }
}
```

Will look for layouts in the `templates` directory, instead of in `layouts`.

### partials

The directory where `metalsmith-layouts` looks for partials. Each partial is named by removing the file extension from its path (relative to the partials directory), so make sure to avoid duplicates. So this `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-layouts": {
      "engine": "handlebars",
      "partials": "partials"
    }
  }
}
```

Would mean that a partial at `partials/nav.html` can be used in layouts as `{{> nav }}`, and `partials/nested/footer.html` can be used as `{{> nested/footer }}`. Note that passing anything but a string to the `partials` option will pass the option on to consolidate.

### pattern

Only files that match this pattern will be processed. So this `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-layouts": {
      "engine": "swig",
      "pattern": "*.md"
    }
  }
}
```

Would only process files that have the `.md` extension.

### Consolidate

Any unrecognised options will be passed on to consolidate.js. You can use this, for example, to disable caching by passing `cache: false`. See the [consolidate.js documentation](https://github.com/tj/consolidate.js) for all options supported by consolidate.

## Origins

This plugin is a fork of the now deprecated [metalsmith-templates](https://github.com/segmentio/metalsmith-templates). Splitting up `metalsmith-templates` into two plugins was suggested by Ian Storm Taylor. The results are:

* [metalsmith-in-place](https://github.com/superwolff/metalsmith-in-place): render templating syntax in your source files.
* [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts): apply layouts to your source files.

## License

MIT
