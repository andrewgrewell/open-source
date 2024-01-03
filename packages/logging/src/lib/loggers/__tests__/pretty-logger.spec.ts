import { prettyLogger } from '../pretty-logger';
import { addColor } from '../../modifiers';

jest.mock('../../modifiers/color', () => {
  return {
    addColor: jest.fn(),
  };
});

const mockAddColor = addColor as jest.Mock;

describe('prettyLogger', () => {
  it('proxy through to addVerboseLogging', () => {
    expect(prettyLogger).toBeUndefined();
    expect(mockAddColor).toHaveBeenCalledWith(console);
  });
  // TODO: update this when the pretty logger includes more than just color
});
