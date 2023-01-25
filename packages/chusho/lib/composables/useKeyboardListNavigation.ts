import { ref } from 'vue';

import debounce from '../utils/debounce';
import { calculateActiveIndex, getNextFocusByKey } from '../utils/keyboard';

type NavigableItemData = {
  disabled?: boolean;
  text?: string;
};

interface NavigableItem {
  id: string | number;
  data: NavigableItemData;
}

interface UseKeyboardListNavigationOptions {
  resolveItems: () => NavigableItem[];
  resolveActiveIndex: (items: NavigableItem[]) => number;
  resolveDisabled: (item: NavigableItem) => boolean;
  loop?: boolean;
  search?: boolean;
}

export default function useKeyboardListNavigation(
  handler: (
    e: KeyboardEvent,
    index: number | null,
    id: NavigableItem['id'] | null
  ) => void,
  {
    resolveItems,
    resolveActiveIndex,
    resolveDisabled,
    loop = false,
    search = true,
  }: UseKeyboardListNavigationOptions
): (e: KeyboardEvent) => void {
  const query = ref<string>('');
  const searchIndex = ref<number>(0);
  const prepareToResetQuery = debounce(() => (query.value = ''), 500);

  function findItemIndexToFocus(
    character: string,
    items: NavigableItem[],
    selectedItemIndex: number
  ): number | null {
    if (!query.value && selectedItemIndex !== -1) {
      searchIndex.value = selectedItemIndex;
    }

    query.value += character.toLowerCase();

    prepareToResetQuery();

    let nextMatch = findMatchInRange(
      items,
      searchIndex.value + 1,
      items.length
    );

    if (!nextMatch) {
      nextMatch = findMatchInRange(items, 0, searchIndex.value);
    }

    return nextMatch;
  }

  function findMatchInRange(
    items: NavigableItem[],
    startIndex: number,
    endIndex: number
  ): number | null {
    for (let index = startIndex; index < endIndex; index++) {
      const item = items[index];
      const label = item.data?.text;

      if (!resolveDisabled(item) && label && label.indexOf(query.value) === 0) {
        return index;
      }
    }
    return null;
  }

  return function handleKeyboardListNavigation(e: KeyboardEvent) {
    const focus = getNextFocusByKey(e.key);
    const items = resolveItems();
    const selectedItemIndex = resolveActiveIndex(items);

    let newIndex = null;

    if (focus !== null) {
      newIndex = calculateActiveIndex<NavigableItem>(
        focus,
        {
          resolveItems: () => items,
          resolveActiveIndex: () => selectedItemIndex,
          resolveDisabled,
        },
        loop
      );
    } else if (search) {
      newIndex = findItemIndexToFocus(e.key, items, selectedItemIndex);
    }

    const newId = newIndex !== null ? items[newIndex].id : null;

    handler(e, newIndex, newId);
  };
}
