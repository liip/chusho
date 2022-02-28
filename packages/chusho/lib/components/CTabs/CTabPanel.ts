import { PropType, defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { SelectedItemId } from '../../composables/useSelectable';

import { generateConfigClass } from '../../utils/components';

import { TabsSymbol } from './CTabs';

export default defineComponent({
  name: 'CTabPanel',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * A unique ID to target the panel with CTab.
     */
    id: {
      type: [String, Number] as PropType<SelectedItemId>,
      required: true,
    },
  },

  setup(props) {
    const tabs = inject(TabsSymbol);

    tabs?.addItem(props.id);

    // Set the first tab as active if none has been defined
    if (tabs?.items.value.length === 1 && !tabs?.selectedItemId.value) {
      tabs.setSelectedItem(props.id);
    }

    return {
      config: useComponentConfig('tabPanel'),
      tabs,
    };
  },

  beforeUnmount() {
    this.tabs?.removeItem(this.id);
  },

  render() {
    if (!this.tabs) return;

    const isActive = this.id === this.tabs.selectedItemId.value;

    if (!isActive) return null;

    const elementProps = {
      id: `${this.tabs.uid}-tabpanel-${this.id}`,
      role: 'tabpanel',
      'aria-labelledby': `${this.tabs.uid}-tab-${this.id}`,
      tabindex: '0',
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
