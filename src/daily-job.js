import 'dotenv/config';
import channels from './channels.json' assert { type: "json" };
import { createDiscordClient } from './client.js';
import { iceBreakerForToday } from './lib/daily-ice-breaker.js';

const client = createDiscordClient({ token: process.env.PRODUCTION_DISCORD_BOT_TOKEN })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  const channelID = channels.general;
  const channel = client.channels.cache.get(channelID);

  const iceBreakerMessage = iceBreakerForToday();
  if (!!iceBreakerMessage) {
    channel.send(iceBreakerMessage);
    return;
  } else {
    console.log("Nothing to do today")
  }
});




