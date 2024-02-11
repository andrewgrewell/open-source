export function getPortFromUrl(url: string) {
  const port = url.match(/:(\d+)/)?.[1];
  if (!port) {
    return;
  }
  return port && parseInt(port, 10);
}
