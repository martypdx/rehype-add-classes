# rehype-add-classes [![Build Status][travis-badge]][travis]

Add classes by selector to elements with [**rehype**][rehype]. 

Useful for adding

* `hljs` class to `<pre>` tag when converting markdown code snippets to html
* css framework (like [Bulma](bulma.io)) classes to elements

## Installation

[npm][]:

```bash
npm install rehype-add-classes
```

## Usage

Consider the following `example.js` with rehype processor (or use unified) setup as follows:

```javascript
import rehype from 'rehype';
import vfile from 'to-vfile';
import addClasses from 'rehype-add-classes';

const processor = rehype()
    .data('settings', { fragment: true })
    .use(addClasses, {
        pre: 'hljs',
        'h1,h2,h3': 'title',
        h1: 'is-1',
        h2: 'is-2',
        p: 'one two'
    });

const html = `
    <pre><code></code></pre>
    <h1>header</h1>
    <h2>sub 1</h2>
    <h2 class="existing">sub 2</h2>
    <p></p>
`;

const { contents } = processor.processSync(vfile({ contents: html }));

console.log(contents);

```

Now, running `node example.js` yields:

```console
    <pre class="hljs"><code></code></pre>
    <h1 class="title is-1">header</h1>
    <h2 class="title is-2">sub 1</h2>
    <h2 class="existing title is-2">sub 2</h2>
    <p class="one two"></p>
```

## API

### `rehype().use(addClases, options])`

Add to `rehype` or `unified` pipeline with `.use`, where `options` is an object
with keys that are the css selectors and the values are a string to add to 
the `class` of each found node.

See [supported selectors](https://github.com/syntax-tree/hast-util-select#support).

## License

[MIT][license] ©[Marty Nelson][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/martypdx/rehype-add-classes.svg

[travis]: https://travis-ci.org/martypdx/rehype-add-classes

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: https://github.com/martypdx

[rehype]: https://github.com/rehypejs/rehype