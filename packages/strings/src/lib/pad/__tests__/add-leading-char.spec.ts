import { addLeadingChar } from '../add-leading-char';

describe('addLeadingSlash', () => {
  const baseString = 'test';
  it.each(['.', '/', '---'])(`should add a leading %s if one is not present`, (char) => {
    expect(addLeadingChar(baseString, char)).toBe(`${char}${baseString}`);
  });

  it.each(['/', '---'])(`should not add a leading %s if one is present`, (char) => {
    expect(addLeadingChar(`${char}${baseString}`, char)).toBe(`${char}${baseString}`);
  });
});
