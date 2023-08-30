

export async function connectionHandler(event) {
  console.log({ event });
  if (event.requestContext.eventType === 'CONNECT') {
    // Handle connection logic here
  } else if (event.requestContext.eventType === 'DISCONNECT') {
    // Handle disconnection logic here
  }
  return { statusCode: 200, body: 'Connected' };
};

export async function messageHandler(event) {
  console.log({ event });
  const body = JSON.parse(event.body);
  const action = body.action;

  if (action === 'ping') {
    // Respond with a 'pong' message
    return {
      statusCode: 200,
      body: JSON.stringify({ action: 'pong' }),
    };
  }

  return { statusCode: 200, body: 'Message processed' };
};
