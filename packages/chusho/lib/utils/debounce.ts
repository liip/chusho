/**
 * Debounce a function call
 * Inspired by https://davidwalsh.name/javascript-debounce-function
 */
export default function debounce<T extends []>(
  fn: (...args: T) => void,
  wait: number,
  immediate = false
) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function caller(this: unknown, ...args: T) {
    const callNow = immediate && !timeout;

    timeout && clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;

      if (!immediate) {
        fn.apply(this, args);
      }
    }, wait);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}
