import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

import { SelectGroupSymbol } from './CSelectGroup';

export default defineComponent({
  name: 'CSelectGroupLabel',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const selectGroup = inject(SelectGroupSymbol);

    return {
      config: useComponentConfig('selectGroupLabel'),
      selectGroup,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      id: this.selectGroup?.labelId,
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
