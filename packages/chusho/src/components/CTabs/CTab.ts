import { defineComponent, h, inject, mergeProps, PropType } from 'vue';

import { TabsSymbol, UseTabs } from './CTabs';
import { props as sharedProps } from './shared';
import { ClassGenerator, DollarChusho, VueClassBinding } from '../../types';

export default defineComponent({
  name: 'CTab',

  inheritAttrs: false,

  props: {
    ...sharedProps,

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
      type: Function as PropType<ClassGenerator>,
      default: null,
    },
  },

  setup(props, { attrs, slots }) {
    const tabs = inject(TabsSymbol) as UseTabs;

    return () => {
      const tabsConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.tabs;
      const isActive = props.target === tabs.currentTab.value;
      const elementProps = {
        type: 'button',
        id: `chusho-tabs-${tabs.uuid}-tab-${props.target}`,
        role: 'tab',
        'aria-selected': `${isActive}`,
        'aria-controls': `chusho-tabs-${tabs.uuid}-tabpanel-${props.target}`,
        tabindex: isActive ? '0' : '-1',
        class: <VueClassBinding[]>[],
        onClick() {
          if (!props.target) return;
          tabs.setCurrentTab(props.target);
        },
      };

      if (!props.bare && tabsConfig?.tabClass) {
        if (typeof tabsConfig.tabClass === 'function') {
          elementProps.class.push(tabsConfig.tabClass(isActive));
        } else {
          elementProps.class.push(tabsConfig.tabClass);
        }
      }

      if (props.classGenerator) {
        elementProps.class.push(props.classGenerator(isActive));
      }

      return h('button', mergeProps(attrs, elementProps), slots);
    };
  },
});
