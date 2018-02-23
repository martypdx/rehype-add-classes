import test from 'ava';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import html from 'rehype-stringify';
import format from 'rehype-format';

import fs from 'fs';

import addClasses from './add-classes';

const processor = unified()
    .use(markdown, { gfm: true })
    .use(remark2rehype)
    .use(highlight)
    .use(addClasses, {
        pre: 'hljs',
        h1: 'header'
    })
    .use(format)
    .use(html);

    
test('adds classes to nodes that match selector', t => {

    const expected = `
<h1 class="header">Title</h1>
<pre class="hljs"><code class="hljs language-js"><span class="hljs-keyword">const</span> sum = <span class="hljs-number">1</span> + <span class="hljs-number">2</span>
</code></pre>
`;

    const md = fs.readFileSync('./test.md');
    const { contents } = processor.processSync(md);
    t.is(contents, expected);
});