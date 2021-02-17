'use strict';

const { assert } = require('chai');

const example = (number) => require(`../data/exampleData${number}.json`);

const ArsenalData = require('../../src/ArsenalParser');

// Testing the main class
describe('ArsenalData', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      ['1', '2', '3', '4', '5', '6'].forEach((ind) => {
        assert.isOk(new ArsenalData(example(ind)));
      });
    });
  });
});
