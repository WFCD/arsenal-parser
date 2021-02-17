'use strict';

const { assert } = require('chai');
const fetch = require('./fetch');

const ArsenalData = require('../../src/ArsenalParser');

describe('ArsenalData', () => {
  describe('#constructor', () => {
    it('can parse live data', async () => {
      assert.isOk(new ArsenalData(await fetch('tobiah')));
    });
  });
});
