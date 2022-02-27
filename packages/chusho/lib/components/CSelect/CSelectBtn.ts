import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';
import { SelectSymbol } from './CSelect';

export default defineComponent({
  name: 'CSelectBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const select = inject(SelectSymbol);

    return {
      config: useComponentConfig('selectBtn'),
      select,
    };
  },

  render() {
    const open = this.select?.togglable.isOpen.value;
    const elementProps: Record<string, unknown> = {
      ...this.select?.togglable.attrs.btn.value,
      'aria-haspopup': 'listbox',
      ...generateConfigClass(this.config?.class, {
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
