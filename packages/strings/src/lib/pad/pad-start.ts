export function padStart(num: number, size: number): string {
  return num.toString().padStart(size, '0');
}
