// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isPlainObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(obj: unknown): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object';
}

export function isPrimitive(
  value: unknown
): value is undefined | boolean | number | string | bigint | symbol {
  return [
    'undefined',
    'boolean',
    'number',
    'string',
    'bigint',
    'symbol',
  ].includes(typeof value);
}

export function mergeDeep(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  source: Record<any, any> = {},
  target: Record<any, any> = {}
): Record<any, any> {
  /* eslint-enable @typescript-eslint/no-explicit-any */
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
