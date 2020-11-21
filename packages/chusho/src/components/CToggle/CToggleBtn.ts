import { inject, defineComponent, h, mergeProps } from 'vue';
import { CBtn } from '../CBtn';
import { ToggleSymbol } from './CToggle';
import { UseToggle } from './CToggle';

export default defineComponent({
  name: 'CToggleBtn',

  inheritAttrs: false,

  setup(props, { attrs, slots }) {
    const toggle = inject(ToggleSymbol) as UseToggle;

    return () => {
      return h(
        CBtn,
        mergeProps(attrs, {
          'aria-expanded': `${toggle.open.value}`,
          'aria-controls': toggle.uuid,
          onClick: toggle.toggle,
        }),
        slots?.default
      );
    };
  },
});
