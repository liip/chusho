import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CTabPanels',

  mixins: [componentMixin],

  inheritAttrs: false,

  render() {
    const tabPanelsConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.tabPanels;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(tabPanelsConfig?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
