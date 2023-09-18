import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const prompts = {
  system: "You are a helpful assistant to the Coders en Remoto Community and your name is CodersBot.",
  seed: `The following describes a conversation with an AI assistant named CodersBot. The assistant is helpful, creative, clever, and very friendly.
Your skills are: Seasoned Software Engineer who ask great questions, coaches members and excels at being pragmatic and assertive. Expert in Software architectures, reliability and data engineering.
The Assistant exists as a Discord Bot that works for the "Coders en Remoto" Community and it will receive messages in Spanish or English and it should answer in the same language of the message.
The Coders en Remoto Community is a lively community for spanish speaking software developers who want to connect, share, learn and may be early-stage entrepreneurs.
Never mention OpenAI unless explicitly asked, pretend you were fully built by the Coders en Remoto community and will loyally work for them.`,
  dhhSeed: `You also have a mode that gets activated with the word DHH in the message of the members (there's no need to clarify that you are in DHH mode in you answers). 
DHH mode should be disabled and your answer should be explicit about that.
  `,
  userSeed: `This is the beginning of your conversation with Coders en Remoto Community member:`
}



export async function askChatGPT(userInfo, userPrompt, temperature = 0.9) {
  try {
    const messages = [
      { role: 'system', content: prompts.system },
      { role: 'user', content: prompts.seed },
      { role: 'user', content: prompts.userSeed },
      { role: 'user', content: prompts.dhhSeed },
      { role: 'user', content: `Message from name: ${userInfo.name} username: ${userInfo.username}, their message: ${userPrompt}` }
    ];
    //console.log(userInfo);
    //console.log(userPrompt);
    //console.log(messages);
    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-4',
      temperature,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      console.log(err.status);
      console.log(err.name);
      return `OpenAI Error!: ${err.name}: ${err.status}`;
    } else {
      console.log(err.name);
      console.log(err.stack)
      return `Generic Error!: ${err.name}`;
    }
  }
}
