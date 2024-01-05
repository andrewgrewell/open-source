import { readJson } from '../read-json';
import { ConsoleMock, mockConsole } from '@ag-oss/logging';
import fs from 'fs';

describe('readJson', function () {
  const setup = () => {
    return {
      spies: {
        jsonParse: jest.spyOn(JSON, 'parse'),
        readFileSync: jest.spyOn(fs, 'readFileSync'),
      },
    };
  };

  let consoleMock: ConsoleMock;

  beforeAll(() => {
    consoleMock = mockConsole(console);
  });

  beforeEach(() => {
    consoleMock.resetAll();
  });

  it('should throw missing file path', function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => readJson()).toThrow('Missing file path');
  });

  it('should throw failed to read file', function () {
    const { spies } = setup();
    spies.readFileSync.mockImplementation(() => {
      console.log('readFileSync called');
      throw new Error('Oops');
    });
    expect(() => readJson('path/to/file.json')).toThrow('Failed to read file');
  });

  it('should throw failed to parse file', function () {
    const { spies } = setup();
    spies.readFileSync.mockImplementation(() => 'contents');
    spies.jsonParse.mockImplementation(() => {
      throw new Error('Oops');
    });
    expect(() => readJson('path/to/file.json')).toThrow('Failed to parse file');
  });
});
