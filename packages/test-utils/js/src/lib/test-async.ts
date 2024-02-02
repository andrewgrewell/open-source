/* istanbul ignore file */
export function testAsync(callback: (done: () => void) => void) {
  return new Promise((resolve) => {
    callback(() => resolve(null));
  });
}
