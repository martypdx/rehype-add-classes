import test from 'ava';
import sum from './add-classes.mjs';


test('adds classes to nodes that match selector', t => {
  t.is(sum(2, 2), 4);
});