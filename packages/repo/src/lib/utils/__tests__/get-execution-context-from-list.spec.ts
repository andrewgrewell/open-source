import { getExecutionContextFromList } from '../get-execution-context-from-list';

describe('getExecutionContextFromList', () => {
  it('should return the execution context if it`s in the list', () => {
    const tags = ['js', 'foo', 'some-other-tag'];
    const result = getExecutionContextFromList(tags);
    expect(result).toEqual('js');
  });

  it('should return undefined if the execution context is not in the list', () => {
    const tags = ['foo', 'some-other-tag'];
    const result = getExecutionContextFromList(tags);
    expect(result).toBeUndefined();
  });
});
