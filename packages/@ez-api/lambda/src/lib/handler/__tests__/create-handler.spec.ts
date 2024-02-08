import { createHandler } from '../create-handler';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

jest.mock('@middy/core', () => {
  return jest.fn(() => {
    return {
      use: jest.fn(),
    };
  });
});
jest.mock('@middy/http-json-body-parser', () => {
  return jest.fn();
});

const mockJsonBodyParser = middyJsonBodyParser as jest.Mock;
const mockMiddy = middy as jest.Mock;

describe('createAuthHandler', () => {
  it('should return a middy handler with common middleware', () => {
    const handler = jest.fn();
    createHandler(handler);
    expect(mockMiddy).toHaveBeenCalled();
    expect(mockJsonBodyParser).toHaveBeenCalledWith({ disableContentTypeError: true });
  });
});
