import { askChatGPT } from './ai.js';
import { fetchMeme } from './utils.js';
import { ChannelType } from 'discord.js';

const BOT_MENTION_LENGTH = 23;

export async function composeReply({ message, botUserId }) {
  if (message.author.bot) return;

  // Check if the bot was mentioned
  if (message.mentions.users.has(botUserId)) {
    // Enable chat gpt in public channels only
    if (message.channel.type !== ChannelType.DM) {

      if (message.content.length < BOT_MENTION_LENGTH + 10) {
        return "Necesito 10 caracteres o más para poder entenderte mejor, por favor inténtalo de nuevo."
      }

      const reply = await askChatGPT({
        name: message.author.displayName,
        username: message.author.username
      }, message.content);

      return reply;
    }
  }

  if (message.content.toLowerCase().includes('meme')) {
    const meme = await fetchMeme();
    return { content: `¡Me pareció que alguien ha dicho meme! Want it or not here it goes 🙊\n${meme.title}`, files: [meme.url] };
  }
}
