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

type InteractiveItemId = string | number;

interface InteractiveItemData {
  text?: string;
  disabled?: boolean;
}

interface InteractiveItem extends InteractiveItemData {
  id: InteractiveItemId;
}

type Items = Map<InteractiveItemId, InteractiveItemData>;
type SelectedItems = Set<InteractiveItemId>;
type ActiveItem = Ref<InteractiveItemId | null>;

export enum InteractiveListRoles {
  menu = 'menu',
  combobox = 'combobox',
  listbox = 'listbox',
  list = 'list',
}

type UseInteractiveListOptions = {
  role: InteractiveListRoles;
  initialValue?: InteractiveItemId[];
  propName?: string | null;
  multiple?: boolean;
  loop?: boolean;
  skipDisabled?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
};

interface UseInteractiveList {
  attrs: {
    role: InteractiveListRoles;
  };
  events: {
    onKeydown: (e: KeyboardEvent) => void;
  };
  items: ComputedRef<InteractiveItem[]>;

  activeItem: ActiveItem;
  multiple: boolean;
  role: InteractiveListRoles;
  selection: ComputedRef<InteractiveItemId | InteractiveItemId[] | null>;

  registerItem: (id: InteractiveItemId, data?: InteractiveItemData) => void;
  updateItem: (id: InteractiveItemId, data: InteractiveItemData) => void;
  unregisterItem: (id: InteractiveItemId) => boolean;

  selectItem: (id: InteractiveItemId) => void;
  deselectItem: (id: InteractiveItemId) => boolean;
  toggleItem: (id: InteractiveItemId) => void;
  resetSelection: () => void;
  clearSelection: () => void;

  activateItemAt: (index: number) => void;
  clearActiveItem: () => void;
}

export const UseInteractiveListSymbol: InjectionKey<UseInteractiveList> =
  Symbol('UseInteractiveList');

export default function useInteractiveList({
  role,
  initialValue = [],
  multiple = false,
  loop = false,
  skipDisabled = false,
}: UseInteractiveListOptions): UseInteractiveList {
  const vm = getCurrentInstance();

  const items = ref<Items>(new Map());
  const initialValueAsArray: InteractiveItemId[] = ensureArray(initialValue);
  const selectedItems = ref<SelectedItems>(new Set(initialValueAsArray));
  const activeItem: ActiveItem = ref(null);

  const selection = computed(() => {
    const selected = [...selectedItems.value];
    return multiple ? selected : selected[0] ?? null;
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

  // FIXME: This should be hanlded by the component, at least the event name, so it can be paired with a v-model
  watch(selection, (newValue) => {
    vm?.emit('change', newValue);
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

  function selectItem(id: InteractiveItemId): void {
    if (!multiple) {
      selectedItems.value.clear();
    }

    selectedItems.value.add(id);
  }

  function deselectItem(id: InteractiveItemId): boolean {
    return selectedItems.value.delete(id);
  }

  function toggleItem(id: InteractiveItemId): void {
    if (!selectedItems.value.has(id)) {
      selectItem(id);
    } else {
      deselectItem(id);
    }
  }

  function resetSelection(): void {
    selectedItems.value = new Set(initialValueAsArray);
  }

  function clearSelection() {
    selectedItems.value.clear();
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
    items: computed(() =>
      [...items.value.entries()].map(([id, data]) => ({ id, ...data }))
    ),

    multiple,
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

    activateItemAt,
    clearActiveItem,
  };

  provide<UseInteractiveList>(UseInteractiveListSymbol, interactiveList);

  return interactiveList;
}
