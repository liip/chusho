import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

import { SelectGroupSymbol } from './CSelectGroup';

export default defineComponent({
  name: 'CSelectGroupLabel',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const selectGroup = inject(SelectGroupSymbol);

    return {
      selectGroup,
    };
  },

  render() {
    const selectGroupLabelConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.selectGroupLabel;
    const elementProps: Record<string, unknown> = {
      id: this.selectGroup?.labelId,
      ...generateConfigClass(selectGroupLabelConfig?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
