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
