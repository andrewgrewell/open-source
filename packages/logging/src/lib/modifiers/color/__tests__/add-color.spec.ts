/**
 * @jest-environment jsdom
 */
import ansiEscapesSerializer from 'jest-serializer-ansi-escapes';
import { addColor } from '../add-color';
import { ConsoleMock, mockConsole } from '../../../../__test-utils__/mock-console';

expect.addSnapshotSerializer(ansiEscapesSerializer);

describe('addColor', () => {
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });
  const originalWindow = global.window;

  describe('node', () => {
    let colorConsole: Console;
    let windowSpy: jest.SpyInstance<typeof global.window>;

    beforeAll(() => {
      windowSpy = jest.spyOn(window, 'window', 'get');
    });

    beforeEach(() => {
      windowSpy.mockReturnValue(undefined as never);
      colorConsole = addColor(global.console);
    });

    it('should return the expect output for `log`', () => {
      colorConsole.log('test');
      expect(consoleMock.spies.log.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "<green>test</>",
        ]
      `);
    });

    it('should return the expect output for `info`', () => {
      colorConsole.info('test');
      expect(consoleMock.spies.info.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "<green>test</>",
        ]
      `);
    });

    it('should return the expect output for `warn`', () => {
      colorConsole.warn('test');
      expect(consoleMock.spies.warn.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "<yellow>test</>",
        ]
      `);
    });

    it('should return the expect output for `error`', () => {
      colorConsole.error('test');
      expect(consoleMock.spies.error.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "<red>test</>",
        ]
      `);
    });

    it('should return the expect output for `debug`', () => {
      colorConsole.debug('test');
      expect(consoleMock.spies.debug.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "<cyan>test</>",
        ]
      `);
    });

    it('should return the expect output for `trace`', () => {
      colorConsole.trace('test');
      expect(consoleMock.spies.trace.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "<magenta>test</>",
        ]
      `);
    });
  });

  describe('browser', () => {
    let colorConsole: Console;
    let windowSpy: jest.SpyInstance<typeof originalWindow>;

    beforeAll(() => {
      windowSpy = jest.spyOn(originalWindow, 'window', 'get');
    });

    beforeEach(() => {
      windowSpy.mockReturnValue(originalWindow);
      colorConsole = addColor(global.console);
    });

    it('should return the expect output for `log`', () => {
      colorConsole.log('test');
      expect(consoleMock.spies.log.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "%ctest",
          "color: green;",
        ]
      `);
    });

    it('should return the expect output for `info`', () => {
      colorConsole.info('test');
      expect(consoleMock.spies.info.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "%ctest",
          "color: green;",
        ]
      `);
    });

    it('should return the expect output for `warn`', () => {
      colorConsole.warn('test');
      expect(consoleMock.spies.warn.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "%ctest",
          "color: yellow;",
        ]
      `);
    });

    it('should return the expect output for `error`', () => {
      colorConsole.error('test');
      expect(consoleMock.spies.error.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "%ctest",
          "color: red;",
        ]
      `);
    });

    it('should return the expect output for `debug`', () => {
      colorConsole.debug('test');
      expect(consoleMock.spies.debug.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "%ctest",
          "color: cyan;",
        ]
      `);
    });

    it('should return the expect output for `trace`', () => {
      colorConsole.trace('test');
      expect(consoleMock.spies.trace.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "%ctest",
          "color: magenta;",
        ]
      `);
    });
  });
});
