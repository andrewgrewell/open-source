import { removeLeadingChar } from '../remove-leading-char';

describe('removeLoadingChar', () => {
  const baseString = 'test';
  it.each(['.', '/', '---'])(`should remove a leading %s if one is present`, (char) => {
    expect(removeLeadingChar(`${char}${baseString}`, char)).toBe(`${baseString}`);
  });

  it.each(['/', '---'])(
    `should not remove a leading %s if one is not present`,
    (char) => {
      expect(removeLeadingChar(baseString, char)).toBe(baseString);
    },
  );
});
