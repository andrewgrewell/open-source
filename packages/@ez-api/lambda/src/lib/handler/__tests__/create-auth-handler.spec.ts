import { createAuthHandler } from '../create-auth-handler';
import { authMiddleware } from '../../middleware';
import { createHandler } from '../create-handler';

jest.mock('../create-handler', () => {
  return {
    createHandler: jest.fn(() => {
      return {
        use: jest.fn(),
      };
    }),
  };
});
jest.mock('../../middleware');

const mockCreateHandler = createHandler as jest.Mock;
const mockAuthMiddleware = authMiddleware as jest.Mock;

describe('createAuthHandler', () => {
  it('should return a handler with auth middleware', () => {
    const handler = jest.fn();
    const options = { authKey: 'secret' };
    createAuthHandler(handler, options);
    expect(mockCreateHandler).toHaveBeenCalled();
    expect(mockAuthMiddleware).toHaveBeenCalledWith(options);
  });
});
