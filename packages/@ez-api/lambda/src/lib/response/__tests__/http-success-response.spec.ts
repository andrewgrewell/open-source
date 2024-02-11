import { httpSuccessResponse } from '../http-success-response';

describe('httpSuccessResponse', () => {
  it('should return a response with the correct status code', () => {
    const response = httpSuccessResponse({}, { statusCode: 204 });
    expect(response.statusCode).toEqual(204);
  });

  it('should return a response with the correct body', () => {
    const mockData = { someValue: true };
    const response = httpSuccessResponse(mockData, { statusCode: 200 });
    expect(response.body).toEqual(
      JSON.stringify({ data: mockData, ok: true, statusCode: 200 }),
    );
  });

  it('should return a response with the correct headers', () => {
    const response = httpSuccessResponse({}, { statusCode: 200 });
    expect(response.headers).toEqual({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Max-Age': 86400,
    });
  });
});
