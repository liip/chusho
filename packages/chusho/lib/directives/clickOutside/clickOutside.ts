import { ObjectDirective } from 'vue';

import { getElement } from '../../utils/components';
import { warn } from '../../utils/debug';

type ClickOutsideHandler = (e: MouseEvent) => void;

interface ClickOutsideOptions {
  ignore?: Array<HTMLElement | SVGElement>;
}

type ClickOutsideBinding =
  | ClickOutsideHandler
  | { handler: ClickOutsideHandler; options: ClickOutsideOptions };

const handlers = new WeakMap();

function handleClick(
  e: MouseEvent,
  el: HTMLElement,
  handler: ClickOutsideHandler,
  options?: ClickOutsideOptions
) {
  const composedPath = e.composedPath();

  if (!el || el === e.target || composedPath.includes(el)) {
    return;
  }

  if (options?.ignore?.length) {
    if (
      options.ignore.some((target) => {
        const el = getElement(target);
        return e.target === el || composedPath.includes(el);
      })
    ) {
      return;
    }
  }

  handler(e);
}

export default {
  name: 'clickOutside',

  mounted(el, binding): void {
    handlers.set(el, (e: MouseEvent) => {
      if (typeof binding.value === 'function') {
        handleClick(e, el, binding.value);
      } else if (typeof binding.value?.handler === 'function') {
        handleClick(e, el, binding.value.handler, binding.value.options);
      } else {
        warn('clickOutside handler must be a Function.');
      }
    });

    document.addEventListener('click', handlers.get(el), {
      passive: true,
    });
  },

  beforeUnmount(el): void {
    const handler = handlers.get(el);
    if (handler) {
      document.removeEventListener('click', handler);
    }
  },
} as ObjectDirective<HTMLElement, ClickOutsideBinding>;
