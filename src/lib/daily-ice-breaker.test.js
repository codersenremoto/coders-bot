import * as utils from './utils.js';
import { iceBreakerForToday } from './daily-ice-breaker.js';

jest.mock('./utils');

describe('iceBreakerForToday', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the Friday ice breaker when the current day is Friday', () => {
    utils.getCurrentWeekDay.mockReturnValue('friday');

    const result = iceBreakerForToday();
    expect(result).toMatch(/¡Hey Coders! ¡Ya es viernes! 😎 😎 😎/);
  });
});
