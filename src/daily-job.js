import 'dotenv/config';
import { createDiscordClient } from './client.js';
import { dailyMessageHandler } from './handlers/daily-message.handler.js';

const client = createDiscordClient({ token: process.env.PRODUCTION_DISCORD_BOT_TOKEN })

client.on('ready', async () => {
  dailyMessageHandler({ client });

  await client.destroy();
});




