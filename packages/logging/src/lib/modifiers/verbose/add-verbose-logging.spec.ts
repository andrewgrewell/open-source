import { addVerboseLogging } from './add-verbose-logging';
import { mockConsole, ConsoleMock } from '../../../__test-utils__/mock-console';

describe('addVerboseLogging', () => {
  const ORIGINAL_ENV = process.env;
  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
  });

  beforeEach(() => {
    jest.resetModules();
    consoleMock.resetAll();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('should log if process.env.VERBOSE === `true`', () => {
    process.env['VERBOSE'] = 'true';
    const console = addVerboseLogging(global.console);
    console.verbose('test');
    expect(consoleMock.spies.log).toHaveBeenCalledWith('test');
  });

  it('should NOT log if process.env.VERBOSE !== `true`', () => {
    process.env['VERBOSE'] = 'false';
    const console = addVerboseLogging(global.console);
    console.verbose('test');
    expect(consoleMock.spies.log).not.toHaveBeenCalledWith('test');
  });

  it('should return actual method if not calling `verbose`', () => {
    const console = addVerboseLogging(global.console);
    console.log('test');
    expect(consoleMock.spies.log).toHaveBeenCalledWith('test');
  });
});
