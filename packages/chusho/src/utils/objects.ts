import { Dictionary } from 'ts-essentials';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPlainObject(value: any): value is Dictionary<any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isObject(obj: object): obj is object {
  return obj !== null && typeof obj === 'object';
}

export function mergeDeep(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  source: Dictionary<any> = {},
  target: Dictionary<any> = {}
  /* eslint-enable @typescript-eslint/no-explicit-any */
) {
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];

    if (isObject(sourceProperty) && isObject(targetProperty)) {
      source[key] = mergeDeep(sourceProperty, targetProperty);
      continue;
    }

    source[key] = targetProperty;
  }

  return source;
}
