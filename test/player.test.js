const assert = require('assert');
const Player = require('../server/game/player');

const p = new Player('test');

p.update({ type: 'move', dx: 3, dy: -2 });
assert.strictEqual(p.x, 3);
assert.strictEqual(p.y, -2);

p.update({ type: 'damage', amount: 40 });
assert.strictEqual(p.hp, 60);

console.log('All tests passed');
