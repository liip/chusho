import { warn } from '../../utils/debug';
import { DirectiveBinding, ObjectDirective } from 'vue';

const handlers = new WeakMap();

function handleClick(e: MouseEvent, el: Element, binding: DirectiveBinding) {
  const path = e.composedPath && e.composedPath();
  const isClickOutside = path
    ? path.indexOf(el) < 0
    : !el.contains(e.target as Node);

  if (isClickOutside) {
    if (typeof binding.value === 'function') {
      binding.value(e);
    } else {
      warn('Click-outside value must be a Function.');
    }
  }
}

export default {
  name: 'clickOutside',

  mounted(el, binding): void {
    handlers.set(el, (e: MouseEvent) => {
      handleClick(e, el, binding);
    });
    document.addEventListener('click', handlers.get(el));
  },

  beforeUnmount(el): void {
    const handler = handlers.get(el);
    if (handler) {
      document.removeEventListener('click', handler);
    }
  },
} as ObjectDirective<Element>;
