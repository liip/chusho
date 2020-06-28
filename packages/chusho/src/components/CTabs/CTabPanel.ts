import { VNodeData } from 'vue/types/umd';
import { defineComponent, createElement, inject } from '@vue/composition-api';

import { TabsSymbol, UseTabs } from './CTabs';
import TabsMixin from './mixin';
import { ClassGenerator } from 'src/types';

interface TabPanelProps {
  id: number | string;
  classGenerator?: ClassGenerator;
  bare?: boolean;
}

export default defineComponent<TabPanelProps>({
  name: 'CTabPanel',

  mixins: [TabsMixin],

  props: {
    /**
     * A unique ID to target the Tab.
     */
    id: {
      type: [Number, String],
      required: true,
    },
    /**
     * Generate classes based on the current component state. It should return a valid Vue “class” syntax (object, array or string), see [Vue class documentation](https://vuejs.org/v2/guide/class-and-style.html).
     *
     * For example: `(active) => ({ 'tab-panel': true, 'tab-panel--active': active })`
     */
    classGenerator: {
      type: Function,
    },
  },

  setup(props, { attrs, parent, slots }) {
    const tabsConfig = parent!.$chusho?.options?.components?.tabs;
    const tabs = inject(TabsSymbol) as UseTabs;

    tabs.registerTab(props.id);

    return () => {
      const isActive = props.id === tabs.currentTab.value;

      if (!isActive) return null;

      const componentData: VNodeData = {
        attrs: {
          ...attrs,
          id: `chusho-tabs-${tabs.uuid}-tabpanel-${props.id}`,
          role: 'tabpanel',
          'aria-labelledby': `chusho-tabs-${tabs.uuid}-tab-${props.id}`,
          tabindex: '0',
        },
        class: [],
      };

      if (!props.bare) {
        if (tabsConfig?.tabPanelClass) {
          if (typeof tabsConfig.tabPanelClass === 'function') {
            componentData.class.push(tabsConfig.tabPanelClass(isActive));
          } else {
            componentData.class.push(tabsConfig.tabPanelClass);
          }
        }
      }

      if (props.classGenerator) {
        componentData.class.push(props.classGenerator(isActive));
      }

      return createElement(
        'div',
        componentData,
        slots.default && slots.default()
      );
    };
  },
});
