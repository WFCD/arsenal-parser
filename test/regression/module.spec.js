import { assert } from 'chai';

import ArsenalData from '../../src/ArsenalParser.js';

import fetch from './fetch.js';

const working = async () => {
  try {
    await fetch('tobiah');
    return true;
  } catch (e) {
    return false;
  }
};

describe('ArsenalData', function () {
  describe('#constructor', () => {
    it('can parse live data', async function () {
      if (!(await working())) this.skip();
      const parsed = JSON.parse(JSON.stringify(new ArsenalData(await fetch('tobiah'))));
      assert.equal(parsed.account.name, 'Tobiah');
      assert.isOk(parsed);
    });
  });
});
