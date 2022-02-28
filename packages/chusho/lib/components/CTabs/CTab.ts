import { PropType, defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { SelectedItemId } from '../../composables/useSelectable';

import { generateConfigClass } from '../../utils/components';

import { TabsSymbol } from './CTabs';

export default defineComponent({
  name: 'CTab',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * The id of the Tab this button should control.
     */
    target: {
      type: [String, Number] as PropType<SelectedItemId>,
      required: true,
    },
  },

  setup() {
    const tabs = inject(TabsSymbol);

    return {
      config: useComponentConfig('tab'),
      tabs,
    };
  },

  render() {
    if (!this.tabs) return null;

    const isActive = this.target === this.tabs.selectedItemId.value;
    const elementProps = {
      type: 'button',
      id: `${this.tabs.uid}-tab-${this.target}`,
      role: 'tab',
      'aria-selected': `${isActive}`,
      'aria-controls': `${this.tabs.uid}-tabpanel-${this.target}`,
      tabindex: isActive ? '0' : '-1',
      onClick: () => {
        if (!['string', 'number'].includes(typeof this.target)) return;
        this.tabs?.setSelectedItem(this.target);
      },
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('button', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
