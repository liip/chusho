import { InjectionKey, inject, reactive, watchEffect } from 'vue';

import useActiveElement from './useActiveElement';
import { UsePopupContext } from './usePopup';

type UsePopupTarget = [
  { id: string },
  { onKeydown: (e: KeyboardEvent) => void },
  Pick<UsePopupContext, 'expanded' | 'renderPopup' | 'triggerKey'>
];

export default function usePopupTarget(
  PopupTargetKey: InjectionKey<UsePopupContext>
): UsePopupTarget {
  const resolved = inject(PopupTargetKey);

  if (!resolved) {
    throw new Error(`Could not resolve ${PopupTargetKey.description}`);
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

  return [
    reactive({ id: uid.id }),
    {
      onKeydown: handleKeydown,
    },
    { expanded, renderPopup, triggerKey },
  ];
}
