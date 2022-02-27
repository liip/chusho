import { Ref, computed, ref } from 'vue';

/**
 * Generic logic to save and restore document.activeElement
 * (the element currently holding focus in a page)
 */
export default function useActiveElement() {
  const savedElement: Ref<HTMLElement | null> = ref(null);

  function save() {
    savedElement.value = document?.activeElement as HTMLElement;
  }

  function restore() {
    if (savedElement.value?.focus) {
      savedElement.value.focus();
    }
    savedElement.value = null;
  }

  return {
    element: computed(() => savedElement.value),
    save,
    restore,
  };
}
