import { inject, reactive, watchEffect } from 'vue';

import useActiveElement from './useActiveElement';
import { UsePopupContext, UsePopupSymbol } from './usePopup';

interface UsePopupTarget
  extends Pick<UsePopupContext, 'expanded' | 'renderPopup' | 'triggerKey'> {
  attrs: { id: string };
  events: { onKeydown: (e: KeyboardEvent) => void };
}

export default function usePopupTarget(): UsePopupTarget {
  const resolved = inject(UsePopupSymbol);

  if (!resolved) {
    throw new Error(`Could not resolve ${UsePopupSymbol.description}`);
  }

  const activeElement = useActiveElement();

  const { uid, expanded, renderPopup, triggerKey, collapse } = resolved;

  watchEffect(() => {
    if (expanded) {
      activeElement.save();
    } else {
      activeElement.restore();
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (['Tab', 'Escape'].includes(e.key)) {
      collapse();
    }
  }

  return {
    attrs: reactive({ id: uid.id }),
    events: {
      onKeydown: handleKeydown,
    },
    expanded,
    renderPopup,
    triggerKey,
  };
}
