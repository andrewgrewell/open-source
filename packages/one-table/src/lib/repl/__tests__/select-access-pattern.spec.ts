import {
  mockAccessPatternWithObjectArg,
  mockAccessPatternWithStringArgs,
} from '../../../__fixtures__/access-patterns.fixture';
import { selectAccessPattern } from '../select-access-pattern';
import prompts from 'prompts';

jest.mock('prompts');

const mockedPrompts = prompts as unknown as jest.MockedFn<typeof prompts>;

describe('selectAccessPattern', () => {
  beforeEach(() => {
    mockedPrompts.mockClear();
  });
  it('should return the access pattern that the user selects', async () => {
    const patterns = [mockAccessPatternWithStringArgs, mockAccessPatternWithObjectArg];
    mockedPrompts.mockResolvedValue({ accessPattern: mockAccessPatternWithStringArgs });
    const result = await selectAccessPattern(patterns);
    expect(mockedPrompts).toHaveBeenCalledWith(
      expect.objectContaining({
        choices: expect.arrayContaining(
          patterns.map((p) => ({ title: p.name, value: p })),
        ),
      }),
    );
    expect(result).toEqual(mockAccessPatternWithStringArgs);
  });
});
