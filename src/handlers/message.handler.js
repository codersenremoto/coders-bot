import { composeReply } from '../lib/replies.js';

export async function messageHandler({ client, message }) {
  console.log({ message });
  const botReply = await composeReply({ message, botUserId: client.user.id });

  if (!!botReply) {
    message.reply(botReply);
  }
}
