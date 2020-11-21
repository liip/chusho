import {
  inject,
  h,
  defineComponent,
  PropType,
  BaseTransitionProps,
  Transition,
  mergeProps,
} from 'vue';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';
import { isPlainObject } from '../../utils/objects';
import { DollarChusho } from '../../types';

export default defineComponent({
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
      type: [Object, Boolean] as PropType<BaseTransitionProps | boolean>,
      default: null,
    },
  },

  setup(props, { slots, attrs }) {
    const toggle = inject(ToggleSymbol) as UseToggle;

    function renderContent() {
      if (toggle.open.value) {
        return h('div', mergeProps(attrs, { id: toggle.uuid }), slots);
      }
      return null;
    }

    return () => {
      const toggleConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.toggle;
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
