import { defineComponent, h, inject, mergeProps, PropType } from 'vue';

import { TabsSymbol, UseTabs } from './CTabs';
import { props as sharedProps } from './shared';
import { ClassGenerator, DollarChusho, VueClassBinding } from '../../types';

export default defineComponent({
  name: 'CTabPanel',

  inheritAttrs: false,

  props: {
    ...sharedProps,

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
      type: Function as PropType<ClassGenerator>,
      default: null,
    },
  },

  setup(props, { attrs, slots }) {
    const tabs = inject(TabsSymbol) as UseTabs;

    tabs.registerTab(props.id);

    return () => {
      const tabsConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.tabs;
      const isActive = props.id === tabs.currentTab.value;

      if (!isActive) return null;

      const elementProps = {
        id: `chusho-tabs-${tabs.uuid}-tabpanel-${props.id}`,
        role: 'tabpanel',
        'aria-labelledby': `chusho-tabs-${tabs.uuid}-tab-${props.id}`,
        tabindex: '0',
        class: <VueClassBinding[]>[],
      };

      if (!props.bare) {
        if (tabsConfig?.tabPanelClass) {
          if (typeof tabsConfig.tabPanelClass === 'function') {
            elementProps.class.push(tabsConfig.tabPanelClass(isActive));
          } else {
            elementProps.class.push(tabsConfig.tabPanelClass);
          }
        }
      }

      if (props.classGenerator) {
        elementProps.class.push(props.classGenerator(isActive));
      }

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
