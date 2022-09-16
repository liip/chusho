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

type Selection = ComputedRef<InteractiveItemId | InteractiveItemId[] | null>;

type RegisterItem = (id: InteractiveItemId, data?: InteractiveItemData) => void;
type UpdateItem = (id: InteractiveItemId, data: InteractiveItemData) => void;
type UnregisterItem = (id: InteractiveItemId) => boolean;

type SelectItem = (id: InteractiveItemId) => void;
type DeselectItem = (id: InteractiveItemId) => boolean;
type ToggleItem = (id: InteractiveItemId) => void;
type ResetSelection = () => void;
type ClearSelection = () => void;

type ActivateItemAt = (index: number) => void;
type ClearActiveItem = () => void;

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
  selection: Selection;

  registerItem: RegisterItem;
  updateItem: UpdateItem;
  unregisterItem: UnregisterItem;

  selectItem: SelectItem;
  deselectItem: DeselectItem;
  toggleItem: ToggleItem;
  resetSelection: ResetSelection;
  clearSelection: ClearSelection;

  activateItemAt: ActivateItemAt;
  clearActiveItem: ClearActiveItem;
}

export const UseInteractiveListSymbol: InjectionKey<UseInteractiveList> =
  Symbol('UseInteractiveList');

function registerItem(items: Ref<Items>): RegisterItem {
  return (id, data = {}) => {
    if (items.value.has(id)) {
      return;
    }

    items.value.set(id, data);
  };
}

function updateItem(items: Ref<Items>): UpdateItem {
  return (id, data) => {
    const item = items.value.get(id);

    if (typeof item === 'undefined') {
      return;
    }

    items.value.set(id, { ...item, ...data });
  };
}

function unregisterItem(items: Ref<Items>): UnregisterItem {
  return (id) => items.value.delete(id);
}

function selectItem(
  selectedItems: Ref<SelectedItems>,
  multiple: boolean
): SelectItem {
  return (id) => {
    if (!multiple) {
      selectedItems.value.clear();
    }

    selectedItems.value.add(id);
  };
}

function deselectItem(selectedItems: Ref<SelectedItems>): DeselectItem {
  return (id) => selectedItems.value.delete(id);
}

function toggleItem(
  selectedItems: Ref<SelectedItems>,
  multiple: boolean
): ToggleItem {
  return (id) => {
    if (!selectedItems.value.has(id)) {
      selectItem(selectedItems, multiple)(id);
    } else {
      deselectItem(selectedItems)(id);
    }
  };
}

function resetSelection(
  selectedItems: Ref<SelectedItems>,
  initialValue: InteractiveItemId[]
): ResetSelection {
  return () => (selectedItems.value = new Set(initialValue));
}

function clearSelection(selectedItems: Ref<SelectedItems>): ClearSelection {
  return () => selectedItems.value.clear();
}

function activateItemAt(
  activeItem: ActiveItem,
  items: Ref<Items>
): ActivateItemAt {
  return (index) =>
    (activeItem.value = getAtIndex([...items.value.keys()], index) ?? null);
}

function clearActiveItem(activeItem: ActiveItem): ClearActiveItem {
  return () => (activeItem.value = null);
}

export default function useInteractiveList({
  role,
  initialValue = [],
  multiple = false,
  loop = false,
  skipDisabled = false,
}: UseInteractiveListOptions): UseInteractiveList {
  const vm = getCurrentInstance();

  const items = ref<Items>(new Map());
  const initialValueArray: InteractiveItemId[] = ensureArray(initialValue);
  const selectedItems = ref(new Set(initialValueArray));
  const activeItem: ActiveItem = ref(null);

  const selection = computed(() => {
    const selected = [...selectedItems.value];

    return multiple ? selected : selected[0] ?? null;
  });

  const activateItemAtFn = activateItemAt(activeItem, items);

  const handleKeydown = useKeyboardListNavigation(
    (e, index) => {
      if (index !== null) {
        e.preventDefault();
        activateItemAtFn(index);
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
    vm?.emit(`change`, newValue);
  });

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

    registerItem: registerItem(items),
    updateItem: updateItem(items),
    unregisterItem: unregisterItem(items),

    selectItem: selectItem(selectedItems, multiple),
    deselectItem: deselectItem(selectedItems),
    toggleItem: toggleItem(selectedItems, multiple),
    resetSelection: resetSelection(selectedItems, initialValueArray),
    clearSelection: clearSelection(selectedItems),

    activateItemAt: activateItemAtFn,
    clearActiveItem: clearActiveItem(activeItem),
  };

  provide<UseInteractiveList>(UseInteractiveListSymbol, interactiveList);

  return interactiveList;
}
