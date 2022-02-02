import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CAlert',

  mixins: [componentMixin],

  inheritAttrs: false,

  render() {
    const alertConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.alert;
    const elementProps: Record<string, unknown> = {
      role: 'alert',
      ...generateConfigClass(alertConfig?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
