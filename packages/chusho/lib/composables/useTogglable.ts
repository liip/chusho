import { VNode, computed, getCurrentInstance, ref, watch } from 'vue';

import uid from '../utils/uid';

/**
 * Generic logic for a button/target pair where the button
 * toggles the target visibility
 */
export default function useTogglable(
  initialValue = false,
  propName = 'modelValue'
) {
  const id = uid('chusho-toggle');
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
