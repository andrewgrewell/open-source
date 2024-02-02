type MockCall = [string, (event: Event) => void];

interface ListenerMap {
  [key: string]: ((event: Event) => void)[];
}

export function getAddListenerCalls(element: HTMLElement) {
  const calls: MockCall[] = (element.addEventListener as jest.Mock).mock.calls;
  return calls.reduce((acc, call) => {
    const eventName = call[0];
    const callback = call[1];
    const callbackList = acc[eventName] || [];
    return {
      ...acc,
      [eventName]: callbackList.concat([callback]),
    };
  }, {} as ListenerMap);
}
