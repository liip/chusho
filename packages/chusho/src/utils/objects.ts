import { Dictionary } from 'ts-essentials';
import { VNodeData } from 'vue/types/umd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isPlainObject(value: unknown): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(obj: unknown): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object';
}

export function mergeDeep(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  source: Dictionary<any> = {},
  target: Dictionary<any> = {}
): Dictionary<any> {
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

const allowedKeys = [
  'key',
  'slot',
  'scopedSlots',
  'ref',
  'refInFor',
  'tag',
  'staticClass',
  'class',
  'staticStyle',
  'style',
  'props',
  'attrs',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'keepAlive',
];

/**
 * Filter object to keep only VNodeData keys accepted in `h`
 */
export function filterVueData(data: VNodeData = {}): VNodeData {
  const res: VNodeData = {};

  Object.keys(data)
    .filter((key) => allowedKeys.includes(key))
    .forEach((key) => {
      res[key as keyof VNodeData] = data[key as keyof VNodeData];
    });

  return res;
}
