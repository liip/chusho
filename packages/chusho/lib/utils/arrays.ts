export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function getAtIndex<T>(array: T[], index: number): T | undefined {
  if (!Number.isInteger(index)) {
    return;
  }

  if (index < 0) {
    index += array.length;
  }

  if (index < 0 || index >= array.length) {
    return;
  }

  return array[index];
}
