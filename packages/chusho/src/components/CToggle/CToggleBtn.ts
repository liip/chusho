import { inject, defineComponent, h, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixin';
import { CBtn } from '../CBtn';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';

export default defineComponent({
  name: 'CToggleBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const toggle = inject(ToggleSymbol) as UseToggle;

    return {
      toggle,
    };
  },

  render() {
    const toggleBtnConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.toggleBtn;
    const elementProps: Record<string, unknown> = {
      'aria-expanded': `${this.toggle.open.value}`,
      'aria-controls': this.toggle.uuid,
      onClick: this.toggle.toggle,
      ...generateConfigClass(toggleBtnConfig?.class, {
        ...this.$props,
        active: this.toggle.open.value,
      }),
      bare: toggleBtnConfig?.inheritBtnClass === false,
    };

    return h(CBtn, mergeProps(this.$attrs, elementProps), this.$slots.default);
  },
});
