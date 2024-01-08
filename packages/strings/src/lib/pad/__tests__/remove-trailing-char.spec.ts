import { removeTrailingChar } from '../remove-trailing-char';

describe('removeTrailingChar', () => {
  const baseString = 'test';
  it.each(['.', '/', '---'])(`should remove a trailing %s if one is present`, (char) => {
    expect(removeTrailingChar(`${baseString}${char}`, char)).toBe(`${baseString}`);
  });

  it.each(['/', '---'])(
    `should not remove a trailing %s if one is not present`,
    (char) => {
      expect(removeTrailingChar(baseString, char)).toBe(baseString);
    },
  );
});
