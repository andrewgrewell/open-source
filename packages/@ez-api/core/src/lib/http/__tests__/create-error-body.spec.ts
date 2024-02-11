import { createErrorBody } from '../create-error-body';
import StatusCode from 'status-code-enum';

describe('createErrorBody', () => {
  it('should return correct error body when all parameters are provided', () => {
    const options = {
      data: { key: 'value' },
      error: new Error('An error occurred'),
      errorCode: 'ERR_CODE',
      statusCode: StatusCode.ServerErrorInternal,
    };
    const result = createErrorBody(options);
    expect(result).toEqual({
      data: options.data,
      error: options.error,
      errorCode: options.errorCode,
      errorMessage: options.error.message,
      ok: false,
      statusCode: options.statusCode,
    });
  });

  it('should return correct error body when only mandatory parameters are provided', () => {
    const options = {
      data: { key: 'value' },
      error: new Error('An error occurred'),
      statusCode: 400,
    };
    const result = createErrorBody(options);
    expect(result).toEqual({
      data: options.data,
      error: options.error,
      errorCode: undefined,
      errorMessage: options.error.message,
      ok: false,
      statusCode: options.statusCode,
    });
  });

  it('should return correct error body when error is a string', () => {
    const options = {
      data: { key: 'value' },
      error: 'An error occurred',
      statusCode: 400,
    };
    const result = createErrorBody(options);
    expect(result).toEqual({
      data: options.data,
      error: undefined,
      errorCode: undefined,
      errorMessage: options.error,
      ok: false,
      statusCode: options.statusCode,
    });
  });

  it('should return correct error body when error is an Error object', () => {
    const options = {
      data: { key: 'value' },
      error: new Error('An error occurred'),
      statusCode: 400,
    };
    const result = createErrorBody(options);
    expect(result).toEqual({
      data: options.data,
      error: options.error,
      errorCode: undefined,
      errorMessage: options.error.message,
      ok: false,
      statusCode: options.statusCode,
    });
  });
});
