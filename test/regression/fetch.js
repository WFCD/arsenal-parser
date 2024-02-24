// based off of derrod's usage on github: https://github.com/derrod/warfra_re/blob/master/twitch/arsenal.py
const BASE_URL = 'https://content.warframe.com/dynamic/twitch/getActiveLoadout.php?account=';

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const WF_ARSENAL_ID = 'ud1zj704c0eb1s553jbkayvqxjft97';
const TWITCH_CHANNEL_ID = '89104719'; // tobitenno

const cache = {};

const v5Token = async () => {
  return (
    await fetch(`https://api.twitch.tv/v5/channels/${TWITCH_CHANNEL_ID}/extensions`, {
      headers: {
        'client-id': CLIENT_ID,
      },
    }).then((d) => d.json())
  )?.tokens?.find((s) => s.extension_id === WF_ARSENAL_ID)?.token;
};

export default async (username) => {
  if (!CLIENT_ID) throw new Error('No defined client id');
  if (cache[username]) return cache[username];

  const token = await v5Token();
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
