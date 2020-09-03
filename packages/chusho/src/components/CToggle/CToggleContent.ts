import { VNode } from 'vue/types/umd';
import { inject, h, defineComponent } from '@vue/composition-api';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';
import { isPlainObject } from '../../utils/objects';
import { VueTransitionProps } from '../../types';

type ToggleContentProps = {
  transition: VueTransitionProps | boolean;
};

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
    let transition: VueTransitionProps;

    if (isPlainObject(props.transition)) {
      transition = props.transition;
    } else if (
      props.transition !== false &&
      toggleConfig &&
      toggleConfig.transition
    ) {
      transition = toggleConfig.transition;
    }

    function renderContent(): VNode | null {
      if (toggle.open.value) {
        return h(
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
      return h('transition', { props: transition }, [renderContent()]);
    };
  },
});
