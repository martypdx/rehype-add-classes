# rehype-add-classes [![Build Status][travis-badge]][travis]

Add classes by selector to elements with [**rehype**][rehype]. 

Useful for adding:

* `hljs` class to `<pre>` tag when converting markdown code snippets to html
* Required css framework classes to elements (for example using [Bulma][bulma])

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

### `rehype().use(addClasses, additions])`

Add to `rehype` or `unified` pipeline with `.use`, where `additions` is an object
with keys that are the css selectors and the values are a string to add to 
the `class` of each found node.

Example:

```js
{
    pre: 'hljs',         
    'h1,h2,h3': 'title',
    h1: 'is-1',         
    h2: 'is-2',         
    p: 'one two'
}       
```

* Results are cumulative: `<h1 class="title is-1">`
* `value` is added to existing classes: `<h2 class="existing title is-2">sub 2</h2>`
* Whole of string indicated by `value` is added: `<p class="one two">`

This library uses `hast-util-select` under the hood. See [these details][supported-selectors]
for supported selectors.

## License

[MIT][license] ©2018 [Marty Nelson][author]

<!-- Definitions -->

[author]: https://github.com/martypdx

[bulma]: https://bulma.io

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[rehype]: https://github.com/rehypejs/rehype

[supported-selectors]: https://github.com/syntax-tree/hast-util-select#support

[travis-badge]: https://img.shields.io/travis/martypdx/rehype-add-classes.svg

[travis]: https://travis-ci.org/martypdx/rehype-add-classes