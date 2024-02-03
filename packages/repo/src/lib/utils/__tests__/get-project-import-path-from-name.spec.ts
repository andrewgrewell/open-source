import { getProjectImportPathFromName } from '../get-project-import-path-from-name';

describe('getProjectImportPathFromName', () => {
  it.each([
    [['scope-name', '@scope'], '@scope/name'],
    [['scope-long-name', '@scope'], '@scope/long-name'],
    [['foo-scope-name', '@foo-scope'], '@foo-scope/name'],
    [['non-npm-scope-project-name', '@scope'], '@scope/non-npm-scope-project-name'],
  ])('should return the correct import path', ([fullName, scope], expected) => {
    expect(getProjectImportPathFromName(fullName, scope)).toEqual(expected);
  });
});
