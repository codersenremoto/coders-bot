export async function handler(event: string) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello',
      input: event,
    }),
  };
}
