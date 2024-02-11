import { createSuccessBody, defaultSuccessStatusCode } from '../create-success-body';

describe('createSuccessBody', () => {
  it('should return the success body when all parameters are provided', () => {
    const options = {
      data: { key: 'value' },
      statusCode: 200,
    };
    const result = createSuccessBody(options);
    expect(result).toEqual({
      data: options.data,
      ok: true,
      statusCode: options.statusCode,
    });
  });

  it('should return the success body with default values when no options are provided', () => {
    const result = createSuccessBody();
    expect(result).toEqual({
      data: {},
      ok: true,
      statusCode: defaultSuccessStatusCode,
    });
  });

  it('should return the success body with default values when no parameters are provided', () => {
    const result = createSuccessBody({});
    expect(result).toEqual({
      data: {},
      ok: true,
      statusCode: defaultSuccessStatusCode,
    });
  });

  it('should return the success body with provided data and default status code when only data is provided', () => {
    const options = {
      data: { key: 'value' },
    };
    const result = createSuccessBody(options);
    expect(result).toEqual({
      data: options.data,
      ok: true,
      statusCode: defaultSuccessStatusCode,
    });
  });

  it('should return the success body with provided status code and default data when only status code is provided', () => {
    const options = {
      statusCode: 404,
    };
    const result = createSuccessBody(options);
    expect(result).toEqual({
      data: {},
      ok: true,
      statusCode: options.statusCode,
    });
  });
});
