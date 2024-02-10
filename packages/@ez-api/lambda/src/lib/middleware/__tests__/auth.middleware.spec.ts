import { sign } from 'jsonwebtoken';
import { authMiddleware, AuthMiddlewareOptions } from '../auth.middleware';
import { httpErrorResponse } from '../../response';
import StatusCode from 'status-code-enum';
import { mockConsole } from '@ag-oss/logging';

jest.mock('../../response');

const mockedErrorResponse = httpErrorResponse as jest.MockedFunction<
  typeof httpErrorResponse
>;

interface TestSetupOptions {
  middlewareOptions?: AuthMiddlewareOptions;
  token?: string;
}

const authKey = 'test';
const noRoleToken = sign({ id: 'no-role', role: undefined }, authKey);
const userToken = sign({ id: 'user-token', role: 'user' }, authKey);

describe('authMiddleware', () => {
  const consoleMock = mockConsole(console);
  const setup = (options?: TestSetupOptions) => {
    const { token, middlewareOptions = {} } = options || {};
    const middleware = authMiddleware(middlewareOptions);
    const event = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
    const request = { context: { foo: true }, event } as any;
    return { event, middleware, request };
  };

  afterEach(() => {
    jest.clearAllMocks();
    consoleMock.resetAll();
  });

  it('should set the auth context if no roles', async () => {
    const { middleware, request } = setup({
      middlewareOptions: { authKey },
      token: noRoleToken,
    });
    await middleware.before(request);
    expect(request.context.auth).toEqual(expect.objectContaining({ id: 'no-role' }));
  });

  it('should set the auth context if roles match', async () => {
    const { middleware, request } = setup({
      middlewareOptions: { allowedRoles: ['user'], authKey },
      token: userToken,
    });
    await middleware.before(request);
    expect(request.context.auth).toEqual(expect.objectContaining({ id: 'user-token' }));
  });

  it('should return an error response if no authKey', async () => {
    consoleMock.disableNextError();
    const { middleware, request } = setup();
    await middleware.before(request);
    expect(consoleMock.spies.error).toHaveBeenCalledWith(
      'authKey is required to use authMiddleware',
    );
    expect(mockedErrorResponse).toHaveBeenLastCalledWith('Service unavailable', {
      statusCode: StatusCode.ServerErrorInternal,
    });
  });

  it('should return an error response if no auth headers', async () => {
    const { middleware, request } = setup({ middlewareOptions: { authKey } });
    request.event.headers = {};
    await middleware.before(request);
    expect(mockedErrorResponse).toHaveBeenLastCalledWith('Missing token', {
      statusCode: StatusCode.ClientErrorUnauthorized,
    });
  });

  it('should return an error response if no token in auth header', async () => {
    const { middleware, request } = setup({ middlewareOptions: { authKey } });
    request.event.headers = { Authorization: undefined };
    await middleware.before(request);
    expect(mockedErrorResponse).toHaveBeenLastCalledWith('Missing token', {
      statusCode: StatusCode.ClientErrorUnauthorized,
    });
  });

  it('should return an error response if token verify fails', async () => {
    consoleMock.disableNextError();
    const { middleware, request } = setup({
      middlewareOptions: { authKey },
      token: 'foo',
    });
    await middleware.before(request);
    expect(mockedErrorResponse).toHaveBeenLastCalledWith(
      'Unable to authenticate request',
      {
        statusCode: StatusCode.ClientErrorUnauthorized,
      },
    );
  });

  it('should return an error if roles are not in token', async () => {
    const { middleware, request } = setup({
      middlewareOptions: { allowedRoles: ['user'], authKey },
      token: noRoleToken,
    });
    await middleware.before(request);
    expect(mockedErrorResponse).toHaveBeenLastCalledWith('Unauthorized', {
      statusCode: StatusCode.ClientErrorUnauthorized,
    });
  });
});
