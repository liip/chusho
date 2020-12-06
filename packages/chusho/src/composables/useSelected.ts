import { computed, ComputedRef, getCurrentInstance, ref, watch } from 'vue';

export type SelectedItemId = string | number;

export type UseSelected = {
  selectedItem: ComputedRef<SelectedItemId | null>;
  items: ComputedRef<SelectedItemId[]>;
  setSelectedItem: (id: SelectedItemId) => void;
  addItem: (id: SelectedItemId) => void;
  removeItem: (id: SelectedItemId) => void;
};

export default function useSelected(
  initialValue: SelectedItemId | null = null,
  propName: string | null = null
): UseSelected {
  const vm = getCurrentInstance();
  const selectedItem = ref<SelectedItemId | null>(initialValue);
  const items = ref<SelectedItemId[]>([]);

  function setSelectedItem(id: SelectedItemId) {
    selectedItem.value = id;
    if (propName) {
      vm?.emit(`update:${propName}`, selectedItem.value);
    }
  }

  function addItem(id: SelectedItemId) {
    items.value.push(id);

    if (items.value.length === 1 && !selectedItem.value) {
      selectedItem.value = id;
    }
  }

  function removeItem(id: SelectedItemId) {
    if (selectedItem.value === id) {
      selectedItem.value = items.value[0];
    }

    items.value.splice(items.value.indexOf(id), 1);
  }

  if (propName) {
    watch(
      () => vm?.props?.[propName],
      (val, oldVal) => {
        if (val !== oldVal && typeof val === 'string') {
          selectedItem.value = val;
        }
      }
    );
  }

  return {
    selectedItem: computed(() => selectedItem.value),
    items: computed(() => items.value),
    setSelectedItem,
    addItem,
    removeItem,
  };
}
