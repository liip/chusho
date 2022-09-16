import { computed, inject, reactive } from 'vue';

import { UsePopup, UsePopupSymbol } from './usePopup';

export interface UsePopupBtn {
  attrs: {
    'aria-expanded': string;
    'aria-controls': string;
    'aria-haspopup': string;
    disabled: boolean;
  };
  events: {
    onClick: (e: MouseEvent) => void;
    onKeydown: (e: KeyboardEvent) => void;
  };
  popup: UsePopup;
}

export default function usePopupBtn(): UsePopupBtn {
  const popup = inject(UsePopupSymbol);

  if (!popup) {
    throw new Error('usePopupBtn must be used within usePopup');
  }

  const { expand, toggle, disabled, uid, expanded, type } = popup;

  function handleKeydown(e: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault(); // Prevent scroll
      expand(e.key);
    }
  }

  function handleClick(e: MouseEvent) {
    // Prevent triggering a potential click-outside listener
    e.stopPropagation();
    toggle('Click');
  }

  return {
    attrs: reactive({
      'aria-controls': uid.id,
      'aria-expanded': computed(() => expanded.value.toString()),
      'aria-haspopup': type,
      disabled,
    }),
    events: {
      onClick: handleClick,
      onKeydown: handleKeydown,
    },
    popup,
  };
}
