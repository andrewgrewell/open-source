import { updatePathToRepoRoot } from '../update-path-to-repo-root';

describe('updatePathToRepoRoot', () => {
  it.each([
    [
      '"someKey": "../../old/path/file.ts"',
      { relativePathToRepoRoot: '../../../..' },
      '"someKey": "../../../../old/path/file.ts"',
    ],
    [
      '"someKey": "../../../old/path/file.ts"\n"someKey": "../../../old/path/file.ts"',
      { relativePathToRepoRoot: '../..' },
      '"someKey": "../../old/path/file.ts"\n"someKey": "../../old/path/file.ts"',
    ],
  ])(`should replace %s`, async (content, options, expected) => {
    const updatedContent = updatePathToRepoRoot(content, {
      ...options,
    } as never);
    expect(updatedContent).toBe(expected);
  });
});
