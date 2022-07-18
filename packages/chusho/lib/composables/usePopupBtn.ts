import { computed, inject, reactive } from 'vue';

import { UsePopupContext, UsePopupSymbol } from './usePopup';

interface UsePopupBtn extends Pick<UsePopupContext, 'expanded'> {
  attrs: {
    disabled: boolean | undefined;
    'aria-expanded': string;
    'aria-controls': string;
    'aria-haspopup': string | undefined;
  };
  events: {
    onClick: (e: MouseEvent) => void;
    onKeydown: (e: KeyboardEvent) => void;
  };
}

export default function usePopupBtn(): UsePopupBtn {
  const popup = inject(UsePopupSymbol);

  if (!popup) {
    throw new Error(`Could not resolve ${UsePopupSymbol.description}`);
  }

  const { collapse, expand, disabled, uid, expanded, type } = popup;

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

  return {
    attrs: reactive({
      'aria-controls': computed(() => uid.id.value),
      'aria-expanded': computed(() => `${expanded.value}`),
      'aria-haspopup': type,
      disabled: computed(() => disabled.value || undefined),
    }),
    events: {
      onClick: handleClick,
      onKeydown: handleKeydown,
    },
    expanded,
  };
}
