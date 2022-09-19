/**
 * Put the given value into an array if it’s not already one.
 */
export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Return the array value at the given index
 * Accepts negative indexes, returning the value starting from the end of the array
 * Returns undefined if the index is out of bounds
 *
 * Example:
 * 2 => [0, 1, 2, 3, 4] => 2
 * -2 => [0, 1, 2, 3, 4] => 3
 */
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
