# RoboVM Documentation Project

Docs are written in [markdown](http://daringfireball.net/projects/markdown/syntax), and rendered using [gitbook](https://github.com/GitbookIO/gitbook).

## Installation

Make sure you have [node](https://nodejs.org/) installed and run

```bash
npm install gitbook-cli -g
gitbook versions:install latest
```

## Development

Gitbook has built-in support for building and testing out the docs as you write.

To start a server, watch for changes to files, and automatically refresh the browser when the build completes, just run

```bash
gitbook serve .
```

The book will be available at [http://localhost:4000/en](http://localhost:4000/en).

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
