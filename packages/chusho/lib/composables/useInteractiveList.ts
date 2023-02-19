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
  tablist = 'tablist',
}

type UseInteractiveListOptions = {
  role: InteractiveListRoles;
  initialValue?: unknown;
  initialActiveItem?: InteractiveItemId;
  valuePropName?: string;
  propName?: string | null;
  multiple?: boolean;
  loop?: boolean;
  skipDisabled?: boolean;
  autoSelect?: boolean;
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
  autoSelect: boolean;
  role: InteractiveListRoles;
  selection: ComputedRef<unknown>;
  activeItem: ActiveItem;

  registerItem: (id: InteractiveItemId, data?: InteractiveItemData) => void;
  updateItem: (id: InteractiveItemId, data: InteractiveItemData) => void;
  unregisterItem: (id: InteractiveItemId) => boolean;

  selectItem: (value: unknown) => void;
  deselectItem: (value: unknown) => boolean;
  toggleItem: (value: unknown) => void;
  resetSelection: () => void;
  clearSelection: () => void;

  activateItem: (id: InteractiveItemId) => void;
  activateItemAt: (index: number) => void;
  clearActiveItem: () => void;
}

export const UseInteractiveListSymbol: InjectionKey<UseInteractiveList> =
  Symbol('UseInteractiveList');

export default function useInteractiveList({
  role, // The role of the list
  initialValue, // Initially selected items
  initialActiveItem, // Initially active item (so it can be focused, but isn’t autofocused)
  valuePropName = 'modelValue', // The prop to update hwen selection changes
  multiple = false, // Whether multiple items can be selected
  loop = false, // Whether to loop around when navigating with the keyboard
  skipDisabled = false, // Whether to skip disabled items when navigating with the keyboard
  autoSelect = false, // Keep the selection in sync with the active item
}: UseInteractiveListOptions): UseInteractiveList {
  const vm = getCurrentInstance();

  const items = ref<Items>(new Map());
  const itemsAsArray = computed(() => {
    return [...items.value.entries()].map(([id, data]) => ({ id, ...data }));
  });

  const initialValueAsArray: unknown[] =
    initialValue !== undefined ? ensureArray(initialValue) : [];
  const selectedValues = ref<SelectedValues>(new Set(initialValueAsArray));
  const activeItem: ActiveItem = ref(initialActiveItem || null);

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

  if (valuePropName) {
    watch(
      () => vm?.props?.[valuePropName],
      (val) => {
        selectedValues.value = new Set(ensureArray(val));
      }
    );
  }

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
    // If the currently selected item gets removed from the list in autoSelect
    // mode, we reset the selection to the first item in the list.
    if (autoSelect && selectedValues.value.has(id)) {
      activateItemAt(0);
    }

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

  function activateItem(id: InteractiveItemId): void {
    activeItem.value = id;
  }

  function activateItemAt(index: number): void {
    activeItem.value = getAtIndex([...items.value.keys()], index) ?? null;

    if (autoSelect) {
      selectItem(activeItem.value);
    }
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
    autoSelect,
    role,
    selection,
    activeItem,

    registerItem,
    updateItem,
    unregisterItem,

    selectItem,
    deselectItem,
    toggleItem,
    resetSelection,
    clearSelection,

    activateItem,
    activateItemAt,
    clearActiveItem,
  };

  provide<UseInteractiveList>(UseInteractiveListSymbol, interactiveList);

  return interactiveList;
}
