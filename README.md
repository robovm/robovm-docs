# RoboVM Documentation Project

## Development

Docs are written in [markdown](http://daringfireball.net/projects/markdown/syntax), and rendered using [gitbook](https://github.com/GitbookIO/gitbook).

Make sure you have [npm](https://www.npmjs.com/) installed and run

```bash
npm install gitbook -g
gitbook serve .
```

This will start a server, watch for changes to files, and automatically refresh the browser when the build completes.

## Deployment

The book can be built for deployment using

```bash
gitbook build .
```

There are options for rendering to pdf and epub, but the default is to output a website in the _book directory.

## Contributing

This book has been written by various RoboVM contributors.

If you notice any errors or would like to help out, please use Github issues to discuss any changes so that work will not be duplicated.

All content is licensed under the [Creative Commons Attribution Non Commercial Share Alike 4.0 license](http://creativecommons.org/licenses/by-nc-sa/4.0/).
