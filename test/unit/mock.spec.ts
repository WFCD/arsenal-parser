import { assert } from 'chai';

import ArsenalData, { type BaseArsenalData } from '../../src/ArsenalParser';
import { default as Player } from '../../src/Player';

const examples: BaseArsenalData[] = (
  await Promise.all(
    new Array(6).fill(0).map(
      (_, i) =>
        import(`../data/exampleData${i + 1}.json`, {
          with: { type: 'json' },
        })
    )
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
