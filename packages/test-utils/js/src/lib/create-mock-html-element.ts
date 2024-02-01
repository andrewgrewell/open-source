export function createMockHtmlElement() {
  const rect = {
    bottom: 0,
    height: 100,
    left: 0,
    right: 0,
    top: 0,
    width: 100,
  } as DOMRect;
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();
  const getBoundingClientRect = jest.fn(() => rect);
  let element: HTMLElement = {} as HTMLElement;
  if (typeof document?.createElement === 'function') {
    element = document.createElement('div');
  }
  element.addEventListener = addEventListener;
  element.removeEventListener = removeEventListener;
  element.getBoundingClientRect = getBoundingClientRect;
  return {
    addEventListener,
    element,
    getBoundingClientRect,
    rect,
    removeEventListener,
  };
}
