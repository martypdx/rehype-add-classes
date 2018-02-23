import test from 'ava';
import rehype from 'rehype';
import vfile from 'vfile';

import addClasses from './index.mjs';

String.prototype.undent = function() {
    return this.replace(/ {2}/g, '');
};

test('add classes based on css selectors', t => {
    
    const processor = rehype()
        .data('settings', { fragment: true })
        .use(addClasses, {
            pre: 'hljs',
            'h1,h2,h3': 'title',
            h1: 'is-1',
            h2: 'is-2',
            p: 'one two'
        });

    const { contents } = processor.processSync(vfile({ 
        contents: `
            <pre><code></code></pre>
            <h1>header</h1>
            <h2>sub 1</h2>
            <h2 class="existing">sub 2</h2>
            <p></p>
        `
    }));

    t.is(contents.undent(), `
        <pre class="hljs"><code></code></pre>
        <h1 class="title is-1">header</h1>
        <h2 class="title is-2">sub 1</h2>
        <h2 class="existing title is-2">sub 2</h2>
        <p class="one two"></p>
    `.undent());

});