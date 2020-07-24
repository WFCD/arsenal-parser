'use strict';

const util = require('util');
const fetch = require('node-fetch');

const { assert } = require('chai');
const exampleData = require('./exampleData.json');
const exampleData2 = require('./exampleData2.json');
const exampleData3 = require('./exampleData3.json');
const exampleData4 = require('./exampleData4.json');
const exampleData5 = require('./exampleData5.json');

const ArsenalData = require('../src/ArsenalParser');

const baseURL = 'https://content.warframe.com/dynamic/twitch/getActiveLoadout.php?account=';

async function fetchArsenal(username) {
  // Fetch the data for the specified username
  const data = await fetch(baseURL + encodeURIComponent(username.toLowerCase()))
    .then((res) => res.json());
  if (data.errors) {
    throw new Error(data.errors);
  }

  return new ArsenalData(data);
}

fetchArsenal('tobiah')
  .then((data) => {
    console.log(util.inspect(data, false, null, true)); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.log(err); // eslint-disable-line no-console
  });

// Testing the main class
describe('ArsenalData', () => {
  describe('#constructor', () => {
    it('should handle real data', () => {
      assert.isOk(new ArsenalData(exampleData));
      assert.isOk(new ArsenalData(exampleData2));
      assert.isOk(new ArsenalData(exampleData3));
      assert.isOk(new ArsenalData(exampleData4));
      assert.isOk(new ArsenalData(exampleData5));
    });
  });
});
