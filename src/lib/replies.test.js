import { composeReply } from './replies.js';
import { askChatGPT } from './ai.js';
import { fetchMeme } from './utils.js';
import { ChannelType } from 'discord.js';
import { jest } from '@jest/globals';

jest.mock('./ai.js');
jest.mock('./utils.js');

describe('composeReply', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('returns nothing if the message is from a bot', async () => {
    const message = { author: { bot: true } };
    const result = await composeReply({ message, botUserId: '123' });
    expect(result).toBeUndefined();
  });

  describe('non ai features', () => {
    it('returns a meme if the message content includes "meme"', async () => {
      const message = {
        author: { bot: false },
        content: 'show me a meme',
        mentions: { users: new Map([]) },
      };
      fetchMeme.mockResolvedValue({ title: 'Funny Meme', url: 'https://meme.url' });
      
      const result = await composeReply({ message, botUserId: '123' });
      
      expect(result).toEqual({
        content: '¡Me pareció que alguien ha dicho meme! Want it or not here it goes 🙊\nFunny Meme',
        files: ['https://meme.url'],
      });
    });
  });

  describe('ai features', () => {
    describe('when the bot is mentioned in a public channel', () => {
      it('returns a GPT-generated reply if the bot was mentioned', async () => {
        const botId = 111111111111111111;
        const botMention = `<@${botId}>`;
        const message = {
          author: { bot: false, displayName: 'John', username: 'john_doe' },
          mentions: { users: new Map([[botId, {}]]) },
          channel: { type: ChannelType.GuildText },
          content: `${botMention} hello there, this a significantly large message`,
        };
        askChatGPT.mockResolvedValue('Hello John!');
        
        const result = await composeReply({ message, botUserId: botId });
        expect(result).toBe('Hello John!');
      });

      it('does not return a GPT-generated reply if the user message is not big enough', async () => {
        const botId = 111111111111111111;
        const botMention = `<@${botId}>`;
        const message = {
          author: { bot: false, displayName: 'John', username: 'john_doe' },
          mentions: { users: new Map([[botId, {}]]) },
          channel: { type: ChannelType.GuildText },
          content: `${botMention} short msg`,
        };
        
        const result = await composeReply({ message, botUserId: botId });
        
        expect(result).toBe("Necesito 10 caracteres o más para poder entenderte mejor, por favor inténtalo de nuevo.");
        expect(askChatGPT).not.toHaveBeenCalled();
      });

      it('does not return a GPT-generated reply if the bot is not mentioned', async () => {
        const message = {
          author: { bot: false, displayName: 'John', username: 'john_doe' },
          mentions: { users: new Map([]) },
          channel: { type: ChannelType.GuildText },
          content: `short msg`,
        };
        
        const result = await composeReply({ message, botUserId: '123' });
        
        expect(result).toBeUndefined();
        expect(askChatGPT).not.toHaveBeenCalled();
      });

    });

    describe('private conversations', () => {
      it('does not return a GPT-generated reply', async () => {
        const message = {
          author: { bot: false, displayName: 'John', username: 'john_doe' },
          mentions: { users: new Map([['123', {}]]) },
          channel: { type: ChannelType.DM },
          content: '@bot Hello there!',
        };

        const result = await composeReply({ message, botUserId: '123' });
        
        expect(result).toBeUndefined();
        expect(askChatGPT).not.toHaveBeenCalled();
      });
    });
  });
});
