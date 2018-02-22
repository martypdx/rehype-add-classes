import test from 'ava';
import sum from './sum.mjs';

test('2 + 2 = 4', t => {
  t.is(sum(2, 2), 4);
});