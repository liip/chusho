import { VNodeData } from 'vue/types/umd';
import { defineComponent, createElement } from '@vue/composition-api';
import TabsMixin from './mixin';

interface TabPanelsProps {
  bare?: boolean;
}

export default defineComponent<TabPanelsProps>({
  name: 'CTabPanels',

  mixins: [TabsMixin],

  props: {},

  setup(props, { attrs, parent, slots }) {
    const tabsConfig = parent!.$chusho?.options?.components?.tabs;

    return () => {
      const componentData: VNodeData = {
        attrs,
        class: props.bare ? null : tabsConfig?.tabPanelsClass,
      };

      return createElement(
        'div',
        componentData,
        slots.default && slots.default()
      );
    };
  },
});
