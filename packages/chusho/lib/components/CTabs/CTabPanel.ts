import { PropType, defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import {
  InteractiveItemId,
  UseInteractiveListSymbol,
} from '../../composables/useInteractiveList';

import { generateConfigClass } from '../../utils/components';

import { TabsSymbol } from './CTabs';

export default defineComponent({
  name: 'CTabPanel',

  mixins: [componentMixin],

  props: {
    /**
     * A unique ID to target the panel with CTab.
     *
     * @type {string|number}
     */
    id: {
      type: [String, Number] as PropType<InteractiveItemId>,
      required: true,
    },
  },

  setup() {
    const tabs = inject(TabsSymbol);
    const interactiveList = inject(UseInteractiveListSymbol);

    if (!interactiveList) {
      throw new Error('CTabList must be used inside CTabs');
    }

    return {
      config: useComponentConfig('tabPanel'),
      tabs,
      interactiveList,
    };
  },

  render() {
    if (!this.tabs) return;

    const isActive = this.id === this.interactiveList.selection.value;

    if (!isActive) return null;

    const elementProps = {
      id: `${this.tabs.uid.id.value}-tabpanel-${this.id}`,
      role: 'tabpanel',
      'aria-labelledby': `${this.tabs.uid.id.value}-tab-${this.id}`,
      tabindex: '0',
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
