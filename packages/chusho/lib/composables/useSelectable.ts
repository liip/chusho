import {
  ComputedRef,
  Ref,
  computed,
  getCurrentInstance,
  ref,
  watch,
} from 'vue';

export type SelectedItemId = string | number;

export interface SelectedItem<DataT = null> {
  id: SelectedItemId;
  data?: DataT;
}

export interface UseSelectable<ItemDataT = null> {
  selectedItemId: ComputedRef<SelectedItemId | null>;
  selectedItemIndex: ComputedRef<number | null>;
  selectedItem: ComputedRef<SelectedItem<ItemDataT> | null>;
  items: ComputedRef<SelectedItem<ItemDataT>[]>;
  setSelectedItem: (id: SelectedItemId) => void;
  addItem: (id: SelectedItemId, data?: Ref<ItemDataT>) => void;
  removeItem: (id: SelectedItemId) => void;
}

/**
 * Generic logic for a single selected item in a list of items, optionally binded to a prop on the parent component.
 */
export default function useSelectable<ItemDataT = null>(
  initialValue: SelectedItemId | null = null,
  propName: string | null = null
): UseSelectable<ItemDataT> {
  const vm = getCurrentInstance();
  const selectedItemId = ref<SelectedItemId | null>(initialValue);
  const items = ref([]) as Ref<SelectedItem<ItemDataT>[]>;

  function setSelectedItem(id: SelectedItemId) {
    selectedItemId.value = id;
    if (propName && vm) {
      vm.emit(`update:${propName}`, selectedItemId.value);
    }
  }

  function addItem(id: SelectedItemId, data?: Ref<ItemDataT>) {
    const item: SelectedItem<ItemDataT> = {
      id,
    };
    if (data) {
      item.data = data.value;
    }
    items.value.push(item);
  }

  function removeItem(id: SelectedItemId) {
    if (selectedItemId.value === id) {
      selectedItemId.value = items.value[0].id;
    }

    items.value.splice(
      items.value.findIndex((item) => item.id === id),
      1
    );
  }

  if (propName) {
    watch(
      () => vm?.props?.[propName],
      (val, oldVal) => {
        if (
          val !== oldVal &&
          (typeof val === 'string' || typeof val === 'number')
        ) {
          selectedItemId.value = val;
        }
      }
    );
  }

  return {
    selectedItemId: computed(() => selectedItemId.value),
    selectedItemIndex: computed(() =>
      items.value.findIndex((item) => item.id === selectedItemId.value)
    ),
    selectedItem: computed(
      () => items.value.find((item) => item.id === selectedItemId.value) ?? null
    ),
    items: computed(() => items.value),
    setSelectedItem,
    addItem,
    removeItem,
  };
}
