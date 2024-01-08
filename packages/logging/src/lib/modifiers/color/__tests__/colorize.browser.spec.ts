import { colorizeBrowser } from '../colorize.browser';

describe('colorizeBrowser', () => {
  it.each([
    ['log', ['%ctest', 'color: green;']],
    ['info', ['%ctest', 'color: green;']],
    ['warn', ['%ctest', 'color: yellow;']],
    ['error', ['%ctest', 'color: red;']],
    ['debug', ['%ctest', 'color: cyan;']],
    ['trace', ['%ctest', 'color: magenta;']],
  ])(`should return the expected output for %s`, (logMethod, expected) => {
    const result = colorizeBrowser('test', logMethod as never);
    expect(result).toEqual(expected);
  });

  it('should return the string as is if the log method is not recognized', () => {
    const result = colorizeBrowser('test', 'foo' as never);
    expect(result).toEqual('test');
  });
});
