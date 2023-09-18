import 'dotenv/config';
import channels from './channels.json' assert { type: "json" };
import { Events } from 'discord.js';
import { createDiscordClient } from './client.js';
import { composeReply } from './lib/replies.js';
import { welcomeMessage } from './lib/welcome.js';

const client = createDiscordClient({ token: process.env.PRODUCTION_DISCORD_BOT_TOKEN });


client.on('messageCreate', async (message) => {
  console.log({ message });
  const botReply = await composeReply({ message, botUserId: client.user.id });

  if (!!botReply) {
    message.reply(botReply);
  }
});

client.on('guildMemberAdd', (member) => {
  const channelID = channels.general;
  const channel = member.guild.channels.cache.get(channelID);
  if (!channel) return;

  const message = welcomeMessage({ member });
  if (!!message) {
    channel.send(message);
  }
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
