import { composeReply } from '../lib/replies.js';
import { messageHandler } from './message.handler.js';

jest.mock('../lib/replies.js');

describe('messageHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('composes a reply', async () => {
    const clientMock = {
      user: { id: '123' }
    };

    const messageMock = {
      reply: jest.fn(),
    };
    
    const reply = 'Reply';
    composeReply.mockResolvedValue(reply);

    await messageHandler({ message: messageMock, client: clientMock });

    expect(messageMock.reply).toHaveBeenCalledWith(reply);
  });
});
