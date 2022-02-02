import { computed, Ref, ref } from 'vue';

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
