export function isPlainObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}
