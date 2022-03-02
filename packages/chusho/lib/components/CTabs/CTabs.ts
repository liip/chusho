import {
  InjectionKey,
  PropType,
  defineComponent,
  h,
  mergeProps,
  provide,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid, { UseCachedUid } from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';
import useSelectable, {
  SelectedItemId,
  UseSelectable,
} from '../../composables/useSelectable';

import { generateConfigClass } from '../../utils/components';

export const TabsSymbol: InjectionKey<Tabs> = Symbol('CTabs');

export interface Tabs extends UseSelectable {
  uid: UseCachedUid;
}

export default defineComponent({
  name: 'CTabs',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Optionally bind the Tabs state with the parent component.
     */
    modelValue: {
      type: [String, Number] as PropType<SelectedItemId>,
      default: null,
    },
    /**
     * The id of the Tab to display by default. This is ignored if `v-model` is used.
     *
     * Defaults to the first tab.
     */
    defaultTab: {
      type: [String, Number] as PropType<SelectedItemId>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    const selected = useSelectable(
      props.modelValue ?? props.defaultTab ?? null,
      'modelValue'
    );
    const tabs: Tabs = {
      uid: useCachedUid('chusho-tabs'),
      ...selected,
    };

    provide(TabsSymbol, tabs);

    return {
      config: useComponentConfig('tabs'),
      tabs,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, this.$props),
      ...this.tabs.uid.cacheAttrs,
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
