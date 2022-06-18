'use strict';

const { assert } = require('chai');
const fetch = require('./fetch');

const ArsenalData = require('../../src/ArsenalParser');

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
      assert.isOk(new ArsenalData(await fetch('tobiah')));
    });
  });
});
