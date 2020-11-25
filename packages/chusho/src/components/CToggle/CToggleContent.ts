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
import componentMixin from '../mixin';
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

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const toggle = inject(ToggleSymbol) as UseToggle;

    return {
      chusho,
      toggle,
    };
  },

  methods: {
    renderContent() {
      const elementProps: Record<string, unknown> = {
        id: this.toggle.uuid,
        ...generateConfigClass(
          this.chusho?.options?.components?.toggleContent?.class,
          this.$props
        ),
      };

      if (this.toggle.open.value) {
        return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
      }

      return null;
    },
  },

  render() {
    const toggleConfig = this.chusho?.options?.components?.toggleContent;
    let transitionProps: BaseTransitionProps | null = null;

    if (isPlainObject(this.transition)) {
      transitionProps = this.transition;
    } else if (this.transition !== false && toggleConfig?.transition) {
      transitionProps = toggleConfig.transition;
    }

    return transitionProps
      ? h(Transition, transitionProps, this.renderContent)
      : this.renderContent();
  },
});
