import { inject, defineComponent, h, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';
import { CBtn } from '../CBtn';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';

export default defineComponent({
  name: 'CToggleBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup(props, { attrs, slots }) {
    const toggle = inject(ToggleSymbol) as UseToggle;

    return () => {
      const toggleBtnConfig = inject<DollarChusho | null>('$chusho', null)
        ?.options?.components?.toggleBtn;
      const elementProps: Record<string, unknown> = {
        'aria-expanded': `${toggle.open.value}`,
        'aria-controls': toggle.uuid,
        onClick: toggle.toggle,
        ...generateConfigClass(toggleBtnConfig?.class, {
          ...props,
          active: toggle.open.value,
        }),
        bare: toggleBtnConfig?.inheritBtnClass === false,
      };

      return h(CBtn, mergeProps(attrs, elementProps), slots?.default);
    };
  },
});
