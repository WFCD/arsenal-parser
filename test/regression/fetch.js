'use strict';

const fetch = require('node-fetch');

const baseURL = 'https://content.warframe.com/dynamic/twitch/getActiveLoadout.php?account=';

async function fetchArsenal(username) {
  // Fetch the data for the specified username
  const data = await fetch(baseURL + encodeURIComponent(username.toLowerCase()))
    .then((res) => res.json());
  if (data.errors) {
    throw new Error(data.errors);
  }

  return data;
}

module.exports = fetchArsenal;
