import {
  ComputedRef,
  InjectionKey,
  Ref,
  computed,
  getCurrentInstance,
  provide,
  ref,
  watch,
} from 'vue';

import { ensureArray, getAtIndex } from '../utils/arrays';
import { warn } from '../utils/debug';
import { isNil } from '../utils/objects';

import useKeyboardListNavigation from './useKeyboardListNavigation';

export type InteractiveItemId = string | number;

export interface InteractiveItemData {
  text?: string;
  disabled?: boolean;
  value?: Ref<unknown>;
}

interface InteractiveItem extends InteractiveItemData {
  id: InteractiveItemId;
}

type Items = Map<InteractiveItemId, InteractiveItemData>;
type SelectedValues = Set<unknown>;
type ActiveItem = Ref<InteractiveItemId | null>;

export enum InteractiveListRoles {
  menu = 'menu',
  combobox = 'combobox',
  listbox = 'listbox',
  list = 'list',
}

type UseInteractiveListOptions = {
  role: InteractiveListRoles;
  initialValue?: unknown;
  valuePropName?: string;
  propName?: string | null;
  multiple?: boolean;
  loop?: boolean;
  skipDisabled?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
};

export interface UseInteractiveList {
  attrs: {
    role: InteractiveListRoles;
  };
  events: {
    onKeydown: (e: KeyboardEvent) => void;
  };
  items: ComputedRef<InteractiveItem[]>;

  multiple: boolean;
  role: InteractiveListRoles;
  selection: ComputedRef<unknown>;
  selectedItems: ComputedRef<InteractiveItem[]>;
  activeItem: ActiveItem;

  registerItem: (id: InteractiveItemId, data?: InteractiveItemData) => void;
  updateItem: (id: InteractiveItemId, data: InteractiveItemData) => void;
  unregisterItem: (id: InteractiveItemId) => boolean;

  selectItem: (value: unknown) => void;
  deselectItem: (value: unknown) => boolean;
  toggleItem: (value: unknown) => void;
  resetSelection: () => void;
  clearSelection: () => void;

  activateItemAt: (index: number) => void;
  clearActiveItem: () => void;
}

export const UseInteractiveListSymbol: InjectionKey<UseInteractiveList> =
  Symbol('UseInteractiveList');

export default function useInteractiveList({
  role,
  initialValue,
  valuePropName = 'modelValue',
  multiple = false,
  loop = false,
  skipDisabled = false,
}: UseInteractiveListOptions): UseInteractiveList {
  const vm = getCurrentInstance();

  const items = ref<Items>(new Map());
  const itemsAsArray = computed(() => {
    return [...items.value.entries()].map(([id, data]) => ({ id, ...data }));
  });

  const initialValueAsArray: unknown[] =
    initialValue !== undefined ? ensureArray(initialValue) : [];
  const selectedValues = ref<SelectedValues>(new Set(initialValueAsArray));
  const selectedItems = computed(() =>
    itemsAsArray.value.filter(
      (item) => item.value && selectedValues.value.has(item.value)
    )
  );
  const activeItem: ActiveItem = ref(null);

  const selection = computed(() => {
    const selected = [...selectedValues.value];
    return multiple ? selected : selected[0];
  });

  const handleKeydown = useKeyboardListNavigation(
    (e, index) => {
      if (index !== null) {
        e.preventDefault();
        activateItemAt(index);
      }
    },
    {
      resolveItems: () =>
        [...items.value.entries()].map(([id, data]) => ({ id, data })) ?? [],
      resolveActiveIndex: () =>
        [...items.value.keys()].findIndex((id) => id === activeItem.value) ??
        -1,
      resolveDisabled: (item) =>
        skipDisabled ? !!item?.data?.disabled : false,
      loop,
    }
  );

  watch(selection, (newValue) => {
    vm?.emit(`update:${valuePropName}`, newValue);
  });

  function registerItem(
    id: InteractiveItemId,
    data: InteractiveItemData = {}
  ): void {
    if (items.value.has(id)) {
      warn(`useInteractiveList: item with id “${id}” is already registered.`);
      return;
    }

    items.value.set(id, data);
  }

  function updateItem(id: InteractiveItemId, data: InteractiveItemData): void {
    const item = items.value.get(id);

    if (typeof item === 'undefined') {
      warn(
        `useInteractiveList: tried to update item “${id}” with ${JSON.stringify(
          data
        )} but no such item exists.`
      );
      return;
    }

    items.value.set(id, { ...item, ...data });
  }

  function unregisterItem(id: InteractiveItemId): boolean {
    return items.value.delete(id);
  }

  function selectItem(value: unknown): void {
    if (!multiple) {
      selectedValues.value.clear();
    }

    selectedValues.value.add(value);
  }

  function deselectItem(value: unknown): boolean {
    return selectedValues.value.delete(value);
  }

  function toggleItem(value: unknown): void {
    if (!selectedValues.value.has(value)) {
      selectItem(value);
    } else {
      deselectItem(value);
    }
  }

  function resetSelection(): void {
    selectedValues.value = new Set(initialValueAsArray);
  }

  function clearSelection() {
    selectedValues.value.clear();
  }

  function activateItemAt(index: number): void {
    activeItem.value = getAtIndex([...items.value.keys()], index) ?? null;
  }

  function clearActiveItem(): void {
    activeItem.value = null;
  }

  const interactiveList: UseInteractiveList = {
    attrs: {
      role,
    },
    events: {
      onKeydown: handleKeydown,
    },
    items: itemsAsArray,

    multiple,
    role,
    selection,
    selectedItems,
    activeItem,

    registerItem,
    updateItem,
    unregisterItem,

    selectItem,
    deselectItem,
    toggleItem,
    resetSelection,
    clearSelection,

    activateItemAt,
    clearActiveItem,
  };

  provide<UseInteractiveList>(UseInteractiveListSymbol, interactiveList);

  return interactiveList;
}
