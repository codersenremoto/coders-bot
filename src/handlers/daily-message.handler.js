import channels from '../channels.json' with { type: "json" };
import { iceBreakerForToday } from '../lib/daily-ice-breaker.js';

export async function dailyMessageHandler({ client }) {
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
}
