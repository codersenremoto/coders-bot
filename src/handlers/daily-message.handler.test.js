import { iceBreakerForToday } from '../lib/daily-ice-breaker.js';
import { dailyMessageHandler } from './daily-message.handler.js';

jest.mock('../lib/daily-ice-breaker.js');

describe('dailyMessageHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('sends an ice breaker message', async () => {
    const clientMock = {
      user: { tag: 'bot' },
      channels: {
        cache: {
          get: jest.fn(),
        },
      },
    };

    const channelMock = {
      send: jest.fn(),
    };

    clientMock.channels.cache.get.mockReturnValue(channelMock);
    const iceBreaker = 'Some ice breaker';
    iceBreakerForToday.mockReturnValue(iceBreaker);

    await dailyMessageHandler({ client: clientMock });

    expect(channelMock.send).toHaveBeenCalledWith(iceBreaker);
  });
});
