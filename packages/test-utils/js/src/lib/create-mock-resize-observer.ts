export interface MockResizeObserver {
  disconnect: jest.Mock;
  observe: jest.Mock;
  unobserve: jest.Mock;
}

export function createMockResizeObserver(observer?: MockResizeObserver) {
  return jest.fn(() => {
    return (
      observer || {
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
      }
    );
  });
}

export function getObserverCallback(observer: jest.Mock) {
  return observer.mock.calls[0][0];
}
