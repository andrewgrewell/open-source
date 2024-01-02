// Add global test setup here

jest.mock('os');

// TODO: bust this out into a test-util so tests can re-mock
// JSDom (which is used by jest) does not implement layout/rendering.
// we create this mock to simply simulate a desktop view with a width of 1000
global.ResizeObserver = class MockResizeObserver {
  constructor(callback: any) {
    const mockElement = {
      contentRect: { width: 1000 },
      getBoundingClientRect: () => mockElement.contentRect,
      isMock: true,
    };
    callback([
      {
        target: mockElement,
      },
    ]);
  }
  observe() {
    //
  }
  unobserve() {
    //
  }
  disconnect() {
    //
  }
};
