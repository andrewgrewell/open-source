export function formatAsFlag(flag: string) {
  if (!flag) {
    return undefined;
  }
  return `--${flag.replace(/^--/, '')}`;
}
