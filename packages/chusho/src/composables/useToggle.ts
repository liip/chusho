import { computed, getCurrentInstance, ref, VNode, watch } from 'vue';

import uuid from '../utils/uuid';

export default function useToggle(
  initialValue = false,
  propName = 'modelValue'
) {
  const id = uuid('chusho-toggle');
  const isOpen = ref(initialValue);
  const vm = getCurrentInstance();

  function setIsOpen(val: boolean) {
    isOpen.value = val;
    vm?.emit(`update:${propName}`, val);
  }

  function toggle() {
    setIsOpen(!isOpen.value);
  }

  function renderIfOpen(render: () => VNode | VNode[], fallback?: () => void) {
    if (isOpen.value) {
      return render();
    }
    if (typeof fallback === 'function') {
      fallback();
    }
    return null;
  }

  watch(
    () => vm?.props?.[propName],
    (val, oldVal) => {
      if (val !== oldVal && typeof val === 'boolean') {
        isOpen.value = val;
      }
    }
  );

  return {
    id,
    isOpen: computed(() => isOpen.value),
    toggle,
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
    renderIfOpen,
    attrs: {
      btn: computed(() => ({
        'aria-expanded': `${isOpen.value}`,
        'aria-controls': id,
        onClick: (e: MouseEvent) => {
          // Prevent triggering a potential click-outside listener
          e.stopPropagation();
          toggle();
        },
      })),
      target: computed(() => ({
        id,
      })),
    },
  };
}
