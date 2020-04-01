import { VNode } from 'vue/types/umd';
import { inject, createElement, defineComponent } from '@vue/composition-api';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';
import { isPlainObject } from '@/utils/objects';

interface ToggleContentProps {
  transition: object | boolean;
}

export default defineComponent<ToggleContentProps>({
  name: 'CToggleContent',

  inheritAttrs: false,

  props: {
    /**
     * The object can contain any Vue built-in [transition component props](https://vuejs.org/v2/api/#transition).
     *
     * For example: `{ name: "fade", mode: "out-in" }`.
     *
     * If you defined a default transition in the config and want to disable it, use `false`.
     */
    transition: {
      type: [Object, Boolean],
      default: null,
    },
  },

  setup(props, { slots, attrs, parent }) {
    const toggleConfig = parent!.$chusho?.options?.components?.toggle;
    const toggle = inject(ToggleSymbol) as UseToggle;
    let transition: object;

    if (isPlainObject(props.transition)) {
      transition = props.transition;
    } else if (toggleConfig && toggleConfig.transition) {
      transition = toggleConfig.transition;
    }

    function renderContent(): VNode | null {
      if (toggle.open.value) {
        return createElement(
          'div',
          {
            attrs: {
              ...attrs,
              id: `chusho-toggle-${toggle.uuid}`,
            },
          },
          slots.default()
        );
      }
      return null;
    }

    return () => {
      if (!transition) return renderContent();
      return createElement('transition', { props: transition }, [
        renderContent(),
      ]);
    };
  },
});
