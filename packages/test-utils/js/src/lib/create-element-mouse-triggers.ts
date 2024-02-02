import { getAddListenerCalls } from './get-add-listener-calls';

export interface MockMoveEvent {
  clientX: number;
  clientY: number;
  // these properties will always be undefined in JSDOM
  // movementX: number;
  // movementY: number;
}

export function createElementMouseTriggers(element: HTMLElement) {
  function getListeners(eventName: string) {
    const calls = getAddListenerCalls(element);
    return calls[eventName] ?? [];
  }
  return {
    simulateDown: (keyCode: number) => {
      const listeners = getListeners('mousedown');
      if (!listeners.length) return;
      console.debug('simulating down: ', keyCode);
      listeners.forEach((listener) =>
        listener(new MouseEvent('mousedown', { button: keyCode })),
      );
    },
    simulateMove: (event: MockMoveEvent) => {
      const listeners = getListeners('mousemove');
      if (!listeners.length) return;
      console.debug('simulating move: ', event);
      listeners.forEach((listener) => listener(event as MouseEvent));
    },
    simulateUp: (keyCode: number) => {
      const listeners = getListeners('mouseup');
      if (!listeners.length) return;
      console.debug('simulating up: ', keyCode);
      listeners.forEach((listener) => {
        listener(new MouseEvent('mousedown', { button: keyCode }));
      });
    },
  };
}
