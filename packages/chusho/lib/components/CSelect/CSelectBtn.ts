import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

import { CBtn } from '../CBtn';
import { SelectSymbol } from './CSelect';

export default defineComponent({
  name: 'CSelectBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const select = inject(SelectSymbol);

    return {
      select,
    };
  },

  render() {
    const selectBtnConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.selectBtn;
    const open = this.select?.togglable.isOpen.value;
    const elementProps: Record<string, unknown> = {
      ...this.select?.togglable.attrs.btn.value,
      'aria-haspopup': 'listbox',
      ...generateConfigClass(selectBtnConfig?.class, {
        ...this.$props,
        active: open,
        disabled: this.select?.disabled.value,
      }),
      bare: true,
      disabled: this.select?.disabled.value,
    };

    return h(CBtn, mergeProps(this.$attrs, this.$props, elementProps), () =>
      this.$slots?.default?.({ open })
    );
  },
});
