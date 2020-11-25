import {
  inject,
  h,
  defineComponent,
  PropType,
  BaseTransitionProps,
  Transition,
  mergeProps,
} from 'vue';

import { DollarChusho } from '../../types';
import { isPlainObject } from '../../utils/objects';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';

export default defineComponent({
  name: 'CToggleContent',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).
     *
     * For example: `{ name: "fade", mode: "out-in" }`.
     *
     * If you defined a default transition in the config and want to disable it, use `false`.
     */
    transition: {
      type: [Object, Boolean] as PropType<BaseTransitionProps | false>,
      default: null,
    },
  },

  setup(props, { slots, attrs }) {
    const toggle = inject(ToggleSymbol) as UseToggle;

    function renderContent() {
      const toggleConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.toggleContent;
      const elementProps: Record<string, unknown> = {
        id: toggle.uuid,
        ...generateConfigClass(toggleConfig?.class, props),
      };

      if (toggle.open.value) {
        return h('div', mergeProps(attrs, elementProps), slots);
      }
      return null;
    }

    return () => {
      const toggleConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.toggleContent;
      let transitionProps: BaseTransitionProps | null = null;

      if (isPlainObject(props.transition)) {
        transitionProps = props.transition;
      } else if (props.transition !== false && toggleConfig?.transition) {
        transitionProps = toggleConfig.transition;
      }

      return transitionProps
        ? h(Transition, transitionProps, renderContent)
        : renderContent();
    };
  },
});
