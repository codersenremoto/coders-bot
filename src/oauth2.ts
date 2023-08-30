import fetch from 'node-fetch';
import querystring from 'querystring';
import { SSM } from 'aws-sdk';

// Function to handle OAuth2 invite creation
export async function authorize(event, context) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.OAUTH2_REDIRECT_URI || '');
  const scope = encodeURIComponent('bot');
  const permissions = '8';

  const discordAuthorizeUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=${scope}&permissions=${permissions}&redirect_uri=${redirectUri}&&response_type=code`;

  return {
    statusCode: 302,
    headers: {
      Location: discordAuthorizeUrl
    }
  };
}

export async function callback(event, context) {
  console.log({ event });
  const code = event.queryStringParameters?.code;

  if (!code) {
    return {
      statusCode: 400,
      body: 'Missing code parameter'
    };
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.OAUTH2_REDIRECT_URI;

  const tokenData = querystring.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    scope: 'identify'
  });

  try {
    // Make a POST request to exchange the code for an access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: tokenData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const tokenJson = await tokenResponse.json();
    console.log(tokenJson);

    // Save to SSM Parameter Store
    const ssm = new SSM();
    const parameterName = `/coders-bot-${process.env.STAGE}/discord/oauth2-tokens`;
    await ssm.putParameter({
      Name: parameterName,
      Value: JSON.stringify(tokenJson),
      Type: 'String',
      Overwrite: true
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully authenticated'
      })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: `Failed to authenticate: ${error}`
    };
  }
}
