/**
 * Exports a Proxy that wraps the console object. This doesn't currently have any functionality
 * but in the future this will be the base for creating extending the functionality of the console object
 */
export const consoleProxy = new Proxy(console, {});
