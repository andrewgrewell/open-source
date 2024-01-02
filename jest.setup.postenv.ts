import '@testing-library/jest-dom';

// use fake timers to avoid flaky tests due to timing issues in CI
jest.useFakeTimers();

expect.extend({
  toBeStyleContaining(received, string) {
    let styles = received?.styles;
    if (!received && !styles) {
      return {
        message: () => `Expect ${styles} to be ${string}`,
        pass: true,
      };
    }
    if (!styles) {
      return {
        message: () =>
          `Expected to receive an object containing styles property, but received ${received}`,
        pass: false,
      };
    }
    const replaceRegex = /[\n\r\s]+/gm;
    styles = styles.replace(replaceRegex, '');
    string = string.replace(replaceRegex, '');
    const stylesParts = styles.split(';');
    const stringParts = string.split(';');
    const match = stringParts.every((part: string) => stylesParts.includes(part));
    if (!match) {
      return {
        message: () => `Expected ${styles} to include ${string}`,
        pass: false,
      };
    }
    return {
      message: () => `Expect ${styles} to include ${string}`,
      pass: true,
    };
  },
});
