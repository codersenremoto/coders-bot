import { Client, GatewayIntentBits } from 'discord.js';

export function createDiscordClient({token}) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  });
  client.login(token);
  return client;
}
