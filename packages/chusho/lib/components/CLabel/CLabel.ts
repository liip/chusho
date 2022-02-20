import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CLabel',

  mixins: [componentMixin],

  inheritAttrs: false,

  render() {
    const labelConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.label;
    const attrs: Record<string, unknown> = {
      ...generateConfigClass(labelConfig?.class, this.$props),
    };

    return h('label', mergeProps(this.$attrs, attrs), this.$slots);
  },
});
