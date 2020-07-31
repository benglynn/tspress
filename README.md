![Node.js CI](https://github.com/benglynn/tspress/workflows/Press%20CI/badge.svg) 

# Press

Press integrates tightly with Webpack to take care of your static site's
content. Feed it with templates and a tree of markdown files and it emits HTML,
templated and transofmed by customisable pipe of composable functions.

## Quick set up

Clone and play with the [Press demo][] to see Press in action. Press is fast and
works well with Webpack DevServer, live reloading when your content changes.

## What does Press need to work?

Press is fed with one or more [pug][] templates, and with a directory structure
where each directory contains an `index.md` file:
```
markdown/
├── index.md
├── french-press/
│   └── index.md
└── tea-pot/
    └── index.md
```

As well as its content, each markdown file may have a yaml metadata header, for
example:

```yaml
---
datePublished: 2020-02-17
tags:
 - vessel
---
# French press

A device for brewing coffee.
```

## How does Press work?

Press walks the markdown directory and for each page firstly pipes a
[Directory][] through a series of transformations into a [Page][] and secondly
redduces a site-wide [CompileContext][].

The pages and compile-context may then pass through a compile pipe to create
HTML.

## Press is built to be customised

The transformations and compiler-context can be anything you want. Presss is
designed to accept any pipeables and reducers with compatible input and output
types.

For example, Press uses [pug][] for templating, but you could use a different
template engine if you replace the pug sepcific parts.

*Much more on customisation TODO...*

## Press is a work in progress

More pipeables and reducers are on the way, please see [issues][] for more.

## Developing Press
```bash
npm run lint
npm run build
npm test
```

[Press demo]: https://github.com/benglynn/press-demo
[Directory]: ./src/types/directory.ts
[Page]: ./src/types/page.ts
[CompileContext]: ./src/types/compile-context.ts
[Pug]: https://pugjs.org
[issues]: https://github.com/benglynn/tspress/issues