import { createMockHtmlElement } from '../create-mock-html-element';
import { getAddListenerCalls } from '../get-add-listener-calls';

describe('getAddListenerCalls', () => {
  it('should return a map of event names to callbacks', () => {
    const { element } = createMockHtmlElement();
    const listener = jest.fn();
    element.addEventListener('click', listener);
    const result = getAddListenerCalls(element);
    expect(result).toEqual({
      click: [listener],
    });
  });

  it('should handle multiple listeners for the same event', () => {
    const { element } = createMockHtmlElement();
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    element.addEventListener('click', listener1);
    element.addEventListener('click', listener2);
    const result = getAddListenerCalls(element);
    expect(result).toEqual({
      click: [listener1, listener2],
    });
  });

  it('should handle multiple events', () => {
    const { element } = createMockHtmlElement();
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    element.addEventListener('click', listener1);
    element.addEventListener('mousemove', listener2);
    const result = getAddListenerCalls(element);
    expect(result).toEqual({
      click: [listener1],
      mousemove: [listener2],
    });
  });
});
