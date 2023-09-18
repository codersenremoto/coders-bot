import 'dotenv/config';
import { Events } from 'discord.js';
import { createDiscordClient } from './client.js';

import { messageHandler } from './handlers/message.handler.js';
import { guildMemberAddHandler } from './handlers/guild-member-add.handler.js';

const client = createDiscordClient({ token: process.env.PRODUCTION_DISCORD_BOT_TOKEN });


client.on('messageCreate', async (message) => {
  await messageHandler({ client, message });
});

client.on('guildMemberAdd', async (member) => {
  await guildMemberAddHandler({ member });
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
