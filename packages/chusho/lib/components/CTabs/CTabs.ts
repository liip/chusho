import {
  InjectionKey,
  PropType,
  defineComponent,
  h,
  mergeProps,
  provide,
  watch,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid, { UseCachedUid } from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveList, {
  InteractiveItemId,
  InteractiveListRoles,
} from '../../composables/useInteractiveList';

import { generateConfigClass } from '../../utils/components';

export const TabsSymbol: InjectionKey<Tabs> = Symbol('CTabs');

export interface Tabs {
  uid: UseCachedUid;
}

export default defineComponent({
  name: 'CTabs',

  mixins: [componentMixin],

  props: {
    /**
     * Optionally bind the Tabs state with the parent component.
     *
     * @type {string|number}
     */
    modelValue: {
      type: [String, Number] as PropType<InteractiveItemId>,
      default: null,
    },
    /**
     * The id of the Tab to display by default. This value is ignored if `v-model` is used and **required** otherwise.
     *
     * @type {string|number}
     */
    defaultTab: {
      type: [String, Number] as PropType<InteractiveItemId>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    if (props.modelValue === null && props.defaultTab === null) {
      throw new Error(
        'CTabs requires either a `v-model` or the `defaultTab` prop to be set.'
      );
    }

    const interactiveList = useInteractiveList({
      role: InteractiveListRoles.tablist,
      initialValue: props.modelValue ?? props.defaultTab ?? null,
      initialActiveItem: props.modelValue ?? props.defaultTab ?? null,
      loop: true,
      skipDisabled: true,
      autoSelect: true,
    });

    // Update selected tab when `v-model` changes
    watch(
      () => props.modelValue,
      (val, oldVal) => {
        if (val !== oldVal && ['string', 'number'].includes(typeof val)) {
          interactiveList.selectItem(val);
        }
      }
    );

    const tabs: Tabs = {
      uid: useCachedUid('chusho-tabs'),
    };

    provide(TabsSymbol, tabs);

    return {
      config: useComponentConfig('tabs'),
      tabs,
      interactiveList,
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
