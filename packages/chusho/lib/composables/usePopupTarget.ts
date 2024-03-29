import { inject, reactive } from 'vue';

import { UsePopup, UsePopupSymbol } from './usePopup';

export interface UsePopupTarget {
  attrs: {
    id: string;
  };
  events: {
    onKeydown: (e: KeyboardEvent) => void;
  };
  popup: UsePopup;
}

export default function usePopupTarget(): UsePopupTarget {
  const popup = inject(UsePopupSymbol);

  if (!popup) {
    throw new Error('usePopupTarget must be used within usePopup');
  }

  const { uid, collapse } = popup;

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      collapse({ restoreFocus: false });
    } else if (e.key === 'Escape') {
      collapse();
    }
  }

  return {
    attrs: reactive({ id: uid.id }),
    events: {
      onKeydown: handleKeydown,
    },
    popup,
  };
}
