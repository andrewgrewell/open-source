import { getExecutionContextFromTags } from '../get-execution-context-from-tags';

describe('getExecutionContextFromTags', () => {
  it('should return the execution context if it`s in the tags', () => {
    const tags = ['js', 'foo', 'some-other-tag'];
    const result = getExecutionContextFromTags(tags);
    expect(result).toEqual('js');
  });

  it('should return undefined if the execution context is not in the tags', () => {
    const tags = ['foo', 'some-other-tag'];
    const result = getExecutionContextFromTags(tags);
    expect(result).toBeUndefined();
  });
});
