import {
  provide,
  InjectionKey,
  defineComponent,
  h,
  PropType,
  inject,
  mergeProps,
} from 'vue';
import uuid from '../../utils/uuid';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import useSelected, {
  UseSelected,
  SelectedItemId,
} from '../../composables/useSelected';

export const TabsSymbol: InjectionKey<UseTabs> = Symbol('CTabs');

export interface UseTabs extends UseSelected {
  uuid: string;
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
    const selected = useSelected(
      props.modelValue ?? props.defaultTab ?? null,
      'modelValue'
    );
    const api: UseTabs = {
      uuid: uuid('chusho-tabs'),
      ...selected,
    };

    provide(TabsSymbol, api);

    return {
      tabs: api,
    };
  },

  render() {
    const tabsConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.tabs;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(tabsConfig?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
