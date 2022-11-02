import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { UseInteractiveListSymbol } from '../../composables/useInteractiveList';

import { generateConfigClass } from '../../utils/components';

import { TabsSymbol } from './CTabs';

export default defineComponent({
  name: 'CTabList',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const tabs = inject(TabsSymbol);
    const interactiveList = inject(UseInteractiveListSymbol);

    if (!interactiveList) {
      throw new Error('CTabList must be used inside CTabs');
    }

    return {
      config: useComponentConfig('tabList'),
      chusho,
      tabs,
      interactiveList,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ref: 'tabList',
      ...this.interactiveList.attrs,
      ...this.interactiveList.events,
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
