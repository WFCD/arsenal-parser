// based off of derrod's usage on github: https://github.com/derrod/warfra_re/blob/master/twitch/arsenal.py
const BASE_URL = 'https://content.warframe.com/dynamic/twitch/getActiveLoadout.php?account=';

const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko'; // Twitch's client id
const WF_ARSENAL_ID = 'ud1zj704c0eb1s553jbkayvqxjft97'; // wf arsenal extension
const TWITCH_CHANNEL_ID = '89104719'; // tobitenno

const cache = {};

const gqlToken = async () => {
  const raw = await fetch(`https://gql.twitch.tv/gql`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT_ID,
    },
    body: `[{"operationName":"ExtensionsForChannel","variables":{"channelID":"${TWITCH_CHANNEL_ID}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"d52085e5b03d1fc3534aa49de8f5128b2ee0f4e700f79bf3875dcb1c90947ac3"}}}]`,
  }).then((d) => d.json());
  return raw?.[0]?.data?.user?.channel?.selfInstalledExtensions?.find((s) => {
    return s?.token?.extensionID === WF_ARSENAL_ID;
  })?.token?.jwt;
};

export default async (username) => {
  if (!CLIENT_ID) throw new Error('No defined client id');
  if (cache[username]) return cache[username];

  const token = await gqlToken();
  // Fetch the data for the specified username
  const data = await fetch(BASE_URL + encodeURIComponent(username.toLowerCase()), {
    headers: {
      Origin: `https://${WF_ARSENAL_ID}.ext-twitch.tv`,
      Referer: `https://${WF_ARSENAL_ID}.ext-twitch.tv`,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
  if (data.errors) {
    throw new Error(data.errors);
  }

  cache[username] = data;
  return data;
};
