export type ProxyHandler = (
  target: { [k: string | symbol]: unknown },
  prop: string | symbol,
) => unknown;

export type TrapHandler = (
  target: { [k: string | symbol]: unknown },
  prop: string | symbol,
  args: unknown[],
) => unknown;

export function createMethodTrap(trapHandler: TrapHandler): ProxyHandler {
  return (target, prop) => {
    const value = target[prop];
    if (typeof value === 'function') {
      return (...args: unknown[]) => {
        return trapHandler(target, prop, args);
      };
    }
    return value;
  };
}
