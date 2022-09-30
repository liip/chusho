import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';
import { CollapseSymbol } from './CCollapse';

export default defineComponent({
  name: 'CCollapseBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const collapse = inject(CollapseSymbol);

    return {
      config: useComponentConfig('collapseBtn'),
      collapse,
    };
  },

  render() {
    const active = this.collapse?.toggle.isOpen.value ?? false;
    const elementProps: Record<string, unknown> = {
      ...this.collapse?.toggle.attrs.btn.value,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active,
      }),
      bare: true,
      active,
    };

    return h(
      CBtn,
      mergeProps(this.$attrs, this.$props, elementProps),
      this.$slots.default
    );
  },
});
