'use strict';

const util = require('util');
const fetch = require('node-fetch');

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
