import { CBtn } from '../CBtn';
import { VNodeData } from 'vue/types/umd';
import { inject, defineComponent, createElement } from '@vue/composition-api';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';

export default defineComponent({
  name: 'CToggleBtn',

  inheritAttrs: false,

  setup(props, { attrs, slots, listeners }) {
    const toggle = inject(ToggleSymbol) as UseToggle;

    return () => {
      const componentData: VNodeData = {
        attrs: {
          ...attrs,
          'aria-expanded': `${toggle.open.value}`,
          'aria-controls': `chusho-toggle-${toggle.uuid}`,
        },
        on: {
          ...listeners,
          click: () => {
            toggle.toggle();
          },
        },
      };
      return createElement(CBtn, componentData, slots.default());
    };
  },
});
