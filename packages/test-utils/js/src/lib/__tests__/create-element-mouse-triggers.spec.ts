import { createElementMouseTriggers } from '../create-element-mouse-triggers';
import { createMockHtmlElement } from '../create-mock-html-element';

describe('createElementMouseTriggers', () => {
  const setup = () => {
    const { element } = createMockHtmlElement();
    const triggers = createElementMouseTriggers(element);
    return { element, triggers };
  };

  it('should return a mouse trigger object', () => {
    const { triggers } = setup();
    expect(triggers).toBeInstanceOf(Object);
  });

  it('should expose a simulateDown function', () => {
    const { triggers } = setup();
    expect(() => {
      triggers.simulateDown(0);
    }).not.toThrow();
  });

  it('should expose a simulateMove function', () => {
    const { triggers } = setup();
    expect(() => {
      triggers.simulateMove({ clientX: 0, clientY: 0 });
    }).not.toThrow();
  });

  it('should expose a simulateUp function', () => {
    const { triggers } = setup();
    expect(() => {
      triggers.simulateUp(0);
    }).not.toThrow();
  });

  it('should trigger a mousedown event', () => {
    const { element, triggers } = setup();
    const spy = jest.fn();
    element.addEventListener('mousedown', spy);

    triggers.simulateDown(0);

    expect(spy).toHaveBeenCalled();
  });

  it('should trigger a mousemove event', () => {
    const { element, triggers } = setup();
    const spy = jest.fn();
    element.addEventListener('mousemove', spy);
    const event = { clientX: 0, clientY: 0 };

    triggers.simulateMove(event);

    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should trigger a mouseup event', () => {
    const { element, triggers } = setup();
    const spy = jest.fn();
    element.addEventListener('mouseup', spy);

    triggers.simulateUp(0);

    expect(spy).toHaveBeenCalled();
  });
});
