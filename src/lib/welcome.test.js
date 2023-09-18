import { welcomeMessage } from './welcome.js';

describe('welcomeMessage', () => {
  it('should return a welcome message', () => {
    const input = { member: 'John' };
    const output = welcomeMessage(input);
    expect(output).toBe('¡Bienvenido a { Coders en Remoto }, John! 👋');
  });
});
