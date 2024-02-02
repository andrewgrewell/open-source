import {
  mockAccessPatternWithObjectArg,
  mockAccessPatternWithStringArgs,
} from '../../../__fixtures__/access-patterns.fixture';
import { createMockModel } from '../../../__test-utils__/create-mock-model';
import { loop } from '../loop';
import { runAccessPattern } from '../run-access-pattern';
import { selectAccessPattern } from '../select-access-pattern';

jest.mock('../run-access-pattern');
jest.mock('../select-access-pattern');

const mockRunAccessPattern = runAccessPattern as jest.MockedFunction<any>;
const mockSelectAccessPattern = selectAccessPattern as jest.MockedFunction<any>;

describe('loop', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // no log
    });
  });
  it('should loop until no access pattern is selected', async () => {
    const modelMap = {
      Bar: createMockModel(),
      Foo: createMockModel(),
    };
    const accessPatterns = [
      mockAccessPatternWithStringArgs,
      mockAccessPatternWithObjectArg,
    ];
    mockSelectAccessPattern.mockResolvedValueOnce(accessPatterns[0]);
    mockSelectAccessPattern.mockResolvedValueOnce(accessPatterns[1]);
    mockSelectAccessPattern.mockResolvedValueOnce(accessPatterns[0]);
    mockSelectAccessPattern.mockResolvedValueOnce(null);
    mockRunAccessPattern.mockResolvedValueOnce('result1');
    mockRunAccessPattern.mockResolvedValueOnce('result2');
    mockRunAccessPattern.mockResolvedValueOnce('result3');
    await loop(accessPatterns, modelMap);
    expect(mockSelectAccessPattern).toHaveBeenCalledTimes(4);
    expect(mockRunAccessPattern).toHaveBeenNthCalledWith(1, accessPatterns[0], modelMap);
    expect(mockRunAccessPattern).toHaveBeenNthCalledWith(2, accessPatterns[1], modelMap);
    expect(mockRunAccessPattern).toHaveBeenNthCalledWith(3, accessPatterns[0], modelMap);
  });
});
