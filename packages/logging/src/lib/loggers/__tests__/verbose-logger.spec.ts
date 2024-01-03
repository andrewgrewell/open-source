import { verboseLogger } from '../verbose-logger';
import { addVerboseLogging } from '../../modifiers';

jest.mock('../../modifiers/verbose', () => {
  return {
    addVerboseLogging: jest.fn(),
  };
});

const mockAddVerboseLogging = addVerboseLogging as jest.Mock;

describe('verboseLogger', () => {
  it('proxy through to addVerboseLogging', () => {
    expect(verboseLogger).toBeUndefined();
    expect(mockAddVerboseLogging).toHaveBeenCalledWith(console);
  });
});
