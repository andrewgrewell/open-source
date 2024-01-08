import { addTrailingChar } from '../add-trailing-char';

describe('addTrailingChar', () => {
  const baseString = 'test';
  it.each(['.', '/', '---'])(`should add a trailing %s if one is not present`, (char) => {
    expect(addTrailingChar(baseString, char)).toBe(`${baseString}${char}`);
  });

  it.each(['/', '---'])(`should not add a trailing %s if one is present`, (char) => {
    expect(addTrailingChar(`${baseString}${char}`, char)).toBe(`${baseString}${char}`);
  });
});
