import { PropType, defineComponent, h, inject, mergeProps, toRef } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { InteractiveItemId } from '../../composables/useInteractiveList';
import useInteractiveListItem from '../../composables/useInteractiveListItem';

import { generateConfigClass } from '../../utils/components';

import { TabsSymbol } from './CTabs';

export default defineComponent({
  name: 'CTab',

  mixins: [componentMixin],

  props: {
    /**
     * The id of the Tab this button should control.
     *
     * @type {string|number}
     */
    target: {
      type: [String, Number] as PropType<InteractiveItemId>,
      required: true,
    },
  },

  setup(props) {
    const tabs = inject(TabsSymbol);
    const interactiveListItem = useInteractiveListItem({
      id: props.target,
      value: toRef(props, 'target'),
    });

    return {
      config: useComponentConfig('tab'),
      tabs,
      interactiveListItem,
    };
  },

  render() {
    if (!this.tabs) return null;

    const isActive = this.interactiveListItem.selected.value;
    const elementProps = {
      ref: this.interactiveListItem.itemRef,
      ...this.interactiveListItem.attrs,
      ...this.interactiveListItem.events,
      type: 'button',
      id: `${this.tabs.uid.id.value}-tab-${this.target}`,
      'aria-controls': `${this.tabs.uid.id.value}-tabpanel-${this.target}`,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('button', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
