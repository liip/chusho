import { computed, ComputedRef, Ref, ref } from 'vue';

export type UseActiveElement = {
  element: ComputedRef<HTMLElement | null>;
  save: () => void;
  restore: () => void;
};

export default function useActiveElement(): UseActiveElement {
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
