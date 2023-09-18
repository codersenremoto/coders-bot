import { welcomeMessage } from '../lib/welcome.js';
import channels from '../channels.json' assert { type: "json" };

export async function guildMemberAddHandler({ member }) {
  const channelID = channels.general;
  const channel = member.guild.channels.cache.get(channelID);
  if (!channel) return;

  const message = welcomeMessage({ member });
  if (!!message) {
    channel.send(message);
  }
}
