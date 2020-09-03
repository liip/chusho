import { VNodeData } from 'vue/types/umd';
import { defineComponent, h, inject } from '@vue/composition-api';

import { TabsSymbol, UseTabs } from './CTabs';
import TabsMixin from './mixin';
import { ClassGenerator } from '../../types';

interface TabProps {
  target: number | string;
  classGenerator?: ClassGenerator;
  bare?: boolean;
}

export default defineComponent<TabProps>({
  name: 'CTab',

  mixins: [TabsMixin],

  props: {
    /**
     * The id of the Tab this button should control.
     */
    target: {
      type: [Number, String],
      required: true,
    },
    /**
     * Generate class based on the current component state. It should return a valid Vue “class” syntax (object, array or string), see [Vue class documentation](https://vuejs.org/v2/guide/class-and-style.html).
     *
     * For example: `(active) => ({ 'btn': true, 'btn--active': active })`
     */
    classGenerator: {
      type: Function,
    },
  },

  setup(props, { attrs, parent, slots }) {
    const tabsConfig = parent!.$chusho?.options?.components?.tabs;
    const tabs = inject(TabsSymbol) as UseTabs;

    return () => {
      const isActive = props.target === tabs.currentTab.value;

      const componentData: VNodeData = {
        attrs: {
          ...attrs,
          type: 'button',
          id: `chusho-tabs-${tabs.uuid}-tab-${props.target}`,
          role: 'tab',
          'aria-selected': `${isActive}`,
          'aria-controls': `chusho-tabs-${tabs.uuid}-tabpanel-${props.target}`,
          tabindex: isActive ? '0' : '-1',
        },
        class: [],
        on: {
          click() {
            if (!props.target) return;
            tabs.setCurrentTab(props.target);
          },
        },
      };

      if (!props.bare) {
        if (tabsConfig?.tabClass) {
          if (typeof tabsConfig.tabClass === 'function') {
            componentData.class.push(tabsConfig.tabClass(isActive));
          } else {
            componentData.class.push(tabsConfig.tabClass);
          }
        }
      }

      if (props.classGenerator) {
        componentData.class.push(props.classGenerator(isActive));
      }

      return h('button', componentData, slots.default && slots.default());
    };
  },
});
