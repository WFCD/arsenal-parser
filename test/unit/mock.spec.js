import { assert } from 'chai';
import ArsenalData from '@wfcd/arsenal-parser';

import Player from '../../src/Player.js';

const examples = (
  await Promise.all(
    new Array(6)
      .fill(0)
      .map((_, i) => import(`../data/exampleData${i + 1}.json`, { with: { type: 'json' }, assert: { type: 'json' } }))
  )
).map((p) => p.default);

// Testing the main class
describe('Mock ArsenalData', () => {
  describe('#constructor', () => {
    it('should handle real data', async function () {
      this.timeout(10000);
      examples.forEach((data) => {
        const parsed = new ArsenalData(data);
        assert.instanceOf(parsed.account, Player);
        assert.isObject(parsed.loadout);
      });
    });
  });
});
