import { guildMemberAddHandler } from './guild-member-add.handler.js';

jest.mock('../lib/daily-ice-breaker.js');

describe('guildMemberAddHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('sends a welcome message', async () => {
    const memberMock = {
      guild: {
        channels: {
          cache: {
            get: jest.fn(),
          },
        },
      }
    };

    const channelMock = {
      send: jest.fn(),
    };

    memberMock.guild.channels.cache.get.mockReturnValue(channelMock);

    await guildMemberAddHandler({ member: memberMock });

    expect(channelMock.send).toHaveBeenCalledWith(expect.stringContaining('¡Bienvenido a { Coders en Remoto }'));
  });
});
