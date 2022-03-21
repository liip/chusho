import { InjectionKey, computed, inject, reactive } from 'vue';

import { UsePopupContext } from './usePopup';

type UsePopupBtn = [
  {
    disabled: boolean | undefined;
    'aria-expanded': string;
    'aria-controls': string;
    'aria-haspopup': string | undefined;
  },
  { onClick: (e: MouseEvent) => void; onKeydown: (e: KeyboardEvent) => void },
  Pick<UsePopupContext, 'expanded'>
];

export default function usePopupBtn(
  PopupBtnKey: InjectionKey<UsePopupContext>
): UsePopupBtn {
  const resolved = inject(PopupBtnKey);

  if (!resolved) {
    throw new Error(`Could not resolve ${PopupBtnKey.description}`);
  }

  const { collapse, expand, disabled, uid, expanded, type } = resolved;

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Tab':
      case 'Escape':
        collapse();
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        expand();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault(); // prevent scroll
        expand(e.key);
        break;
      default:
        break;
    }
  }

  function handleClick(e: MouseEvent) {
    // Prevent triggering a potential click-outside listener
    e.stopPropagation();
    expanded.value === true ? collapse() : expand();
  }

  return [
    reactive({
      'aria-controls': computed(() => uid.id.value),
      'aria-expanded': computed(() => `${expanded.value}`),
      'aria-haspopup': type,
      disabled: computed(() => disabled.value || undefined),
    }),
    {
      onClick: handleClick,
      onKeydown: handleKeydown,
    },
    { expanded },
  ];
}
