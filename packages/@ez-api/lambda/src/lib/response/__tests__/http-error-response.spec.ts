import { httpErrorResponse, HttpErrorOptions } from '../http-error-response';
import { defaultErrorStatusCode } from '@ez-api/core';

describe('httpErrorResponse', () => {
  const options: HttpErrorOptions = {
    data: { key: 'value' },
    statusCode: 400,
  };

  it('should return correct structure when called with error message and options', () => {
    const result = httpErrorResponse('Error message', options);
    expect(result).toHaveProperty('body');
    expect(result).toHaveProperty('statusCode', 400);
    expect(result).toHaveProperty('headers');
  });

  it('should return correct structure when called with error object and options', () => {
    const error = new Error('Error message');
    const result = httpErrorResponse(error, options);
    expect(result).toHaveProperty('body');
    expect(result).toHaveProperty('statusCode', 400);
    expect(result).toHaveProperty('headers');
  });

  it('should return default statusCode when called with error message and options without statusCode', () => {
    const result = httpErrorResponse('Error message', { data: { key: 'value' } });
    expect(result).toHaveProperty('body');
    expect(result).toHaveProperty('statusCode', defaultErrorStatusCode);
    expect(result).toHaveProperty('headers');
  });

  it('should return default statusCode when called with error object and options without statusCode', () => {
    const error = new Error('Error message');
    const result = httpErrorResponse(error, { data: { key: 'value' } });
    expect(result).toHaveProperty('body');
    expect(result).toHaveProperty('statusCode', defaultErrorStatusCode);
    expect(result).toHaveProperty('headers');
  });
});
