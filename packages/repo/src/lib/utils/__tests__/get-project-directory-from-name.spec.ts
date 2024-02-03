import { getProjectDirectoryFromName } from '../get-project-directory-from-name';

describe('getProjectDirectoryFromName', () => {
  it.each([
    [['scope-project', '@scope', ''], '@scope/project'],
    [['scope-project-context', '@scope', 'context'], '@scope/project/context'],
    [['scope-project-context', 'scope', 'context'], 'scope/project/context'],
    [['project-context', '', 'context'], 'project/context'],
    [['project', '', 'context'], 'project'],
    [
      ['long-scope-name-project-name-some-context', '@long-scope-name', 'some-context'],
      '@long-scope-name/project-name/some-context',
    ],
  ])(
    'should return the correct directory for %s',
    ([fullName, scope, context], expected) => {
      expect(getProjectDirectoryFromName(fullName, scope, context)).toEqual(expected);
    },
  );
});
