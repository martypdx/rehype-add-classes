import test from 'ava';
import unified from 'unified';
import parse from 'rehype-parse';
import stringify from 'rehype-stringify';
import vfile from 'vfile';

import addClasses from './add-classes';

String.prototype.undent = function() {
    return this.replace(/ {2}/g, '');
};

test.only('direct rehype and vfile use', t => {
    
    const trans = unified()
        .use(parse, { fragment: true })
        .use(addClasses, {
            pre: 'hljs',
            'h1,h2,h3': 'title',
            h1: 'is-1',
            h2: 'is-2',
            h3: 'is-3',
        })
        .use(stringify);

    const { contents } = trans.processSync(vfile({ 
        contents: `
            <h1>header</h1>
            <pre><code></code></pre>
            <h2>subheader 1</h2>
            <h3>subsubheader</h3>
            <h2>subheader 2</h2>
        `
    }));

    t.is(contents.undent(), `
        <h1 class="title is-1">header</h1>
        <pre class="hljs"><code></code></pre>
        <h2 class="title is-2">subheader 1</h2>
        <h3 class="title is-3">subsubheader</h3>
        <h2 class="title is-2">subheader 2</h2>
    `.undent());


});