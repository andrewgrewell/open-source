import { mockAccessPatternWithStringArgs } from '../../../__fixtures__/access-patterns.fixture';
import { createMockModel } from '../../../__test-utils__/create-mock-model';
import { buildArgsFromAnswers } from '../build-args-from-answers';
import { promptForParamValues } from '../prompt-for-param-values';
import { runAccessPattern } from '../run-access-pattern';

jest.mock('../prompt-for-param-values');
jest.mock('../build-args-from-answers');

const mockBuildArgsFromAnswers = buildArgsFromAnswers as jest.MockedFunction<any>;
const mockPromptForParamValues = promptForParamValues as jest.MockedFunction<any>;

describe('runAccessPattern', () => {
  const setup = () => {
    return {
      config: mockAccessPatternWithStringArgs,
      models: {
        Bar: createMockModel(),
        Foo: createMockModel(),
      },
    };
  };
  it('should call executor with the correct args', async () => {
    const { config, models } = setup();
    mockPromptForParamValues.mockResolvedValue([{ arg1: 'foo' }, { arg2: 5 }]);
    mockBuildArgsFromAnswers.mockReturnValue(['foo', 5]);
    await runAccessPattern(config, models);
    expect(config.executor).toHaveBeenCalledWith('foo', 5, models);
  });
});
