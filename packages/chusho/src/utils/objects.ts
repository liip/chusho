/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function isPlainObject(value: any): value is Dictionary<any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}
