import { ref } from 'vue';

import debounce from '../utils/debounce';
import { calculateActiveIndex, getNextFocusByKey } from '../utils/keyboard';

type NavigableItemData = {
  disabled?: boolean;
  text?: string;
};

interface NavigableItem {
  id: string | number;
  data?: NavigableItemData;
}

interface UseKeyboardListNavigationOptions {
  resolveItems: () => NavigableItem[];
  resolveActiveIndex: () => number;
  resolveDisabled: (item: NavigableItem) => boolean;
  loop?: boolean;
}

export default function useKeyboardListNavigation(
  handler: (e: KeyboardEvent, index: number | null) => void,
  {
    resolveItems,
    resolveActiveIndex,
    resolveDisabled,
    loop = false,
  }: UseKeyboardListNavigationOptions
): (e: KeyboardEvent) => void {
  const query = ref<string>('');
  const searchIndex = ref<number>(0);
  const prepareToResetQuery = debounce(() => (query.value = ''), 500);

  function findItemIndexToFocus(character: string): number | null {
    const items = resolveItems();
    const selectedItemIndex = resolveActiveIndex();

    if (!query.value && selectedItemIndex !== -1) {
      searchIndex.value = selectedItemIndex;
    }

    query.value += character;

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

    let newIndex = null;

    if (focus === null) {
      newIndex = findItemIndexToFocus(e.key);
    } else {
      newIndex = calculateActiveIndex<NavigableItem>(
        focus,
        {
          resolveItems,
          resolveActiveIndex,
          resolveDisabled,
        },
        loop
      );
    }

    handler(e, newIndex);
  };
}
