import { jestPrettierFix } from '../../../../../repo/src/lib/tasks/jest-prettier-fix/jest-prettier-fix';
import { readFileAsync, writeFileAsync } from '@ag-oss/fs';
import { promisifyObservable } from '@ag-oss/rxjs';

jest.mock('@ag-oss/fs', () => {
  const originalModule = jest.requireActual('@ag-oss/fs');
  return {
    ...originalModule,
    readFileAsync: jest.fn(),
    writeFileAsync: jest.fn(),
  };
});

const mockReadFileAsync = readFileAsync as jest.Mock;
const mockWriteFileAsync = writeFileAsync as jest.Mock;

describe('jestPrettierFix', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add prettier-2 to jest.config.json', async () => {
    const jestConfigContents = `/* eslint-disable */
    export default {
      displayName: 'repo',
      preset: '../../jest.preset.js',
      transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
      },
      moduleFileExtensions: ['ts', 'js', 'html'],
      coverageDirectory: '../../coverage/packages/repo',
    };`;

    mockReadFileAsync.mockResolvedValueOnce(jestConfigContents);

    const task = jestPrettierFix({
      jestConfigPath: 'jest.config.json',
    });
    await promisifyObservable(task.run());
    expect(mockWriteFileAsync.mock.calls[0][1]).toMatchInlineSnapshot(`
      "/* eslint-disable */
          export default {
            prettierPath: require.resolve('prettier-2'),
        displayName: 'repo',
            preset: '../../jest.preset.js',
            transform: {
              '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
            },
            moduleFileExtensions: ['ts', 'js', 'html'],
            coverageDirectory: '../../coverage/packages/repo',
          };"
    `);
  });

  it('should not add prettier-2 to jest.config.json if it already exists', async () => {
    const jestConfigContents = `/* eslint-disable */
    export default {
      prettierPath: require.resolve('prettier-2'),
      displayName: 'repo',
      preset: '../../jest.preset.js',
      transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
      },
      moduleFileExtensions: ['ts', 'js', 'html'],
      coverageDirectory: '../../coverage/packages/repo',
    };`;

    mockReadFileAsync.mockResolvedValueOnce(jestConfigContents);

    const task = jestPrettierFix({
      jestConfigPath: 'jest.config.json',
    });
    await promisifyObservable(task.run());
    expect(mockWriteFileAsync).not.toHaveBeenCalled();
  });
});
