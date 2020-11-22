import { DollarChusho } from '../../types';
import {
  provide,
  computed,
  InjectionKey,
  defineComponent,
  h,
  watchEffect,
  Ref,
  reactive,
  PropType,
  inject,
  mergeProps,
} from 'vue';
import uuid from '../../utils/uuid';
import { props as sharedProps } from './shared';

export const TabsSymbol: InjectionKey<UseTabs> = Symbol();

export declare type TabId = string | number;

interface TabsState {
  currentTab?: TabId;
  tabs: TabId[];
}

export interface UseTabs {
  uuid: string;
  currentTab: Readonly<Ref<TabId | undefined>>;
  tabs: Readonly<Ref<readonly TabId[]>>;
  setCurrentTab: (id: TabId) => void;
  registerTab: (id: TabId) => void;
}

export default defineComponent({
  name: 'CTabs',

  inheritAttrs: false,

  props: {
    ...sharedProps,

    /**
     * Optionally bind the Tabs state with the parent component.
     */
    modelValue: {
      type: [Number, String] as PropType<TabId>,
      default: null,
    },
    /**
     * The id of the Tab to display by default. This will be ignored if `v-model` is used.
     *
     * Defaults to the first tab.
     */
    defaultTab: {
      type: [Number, String] as PropType<TabId>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { slots, attrs, emit }) {
    const state = reactive<TabsState>({
      currentTab: props.modelValue || props.defaultTab,
      tabs: [],
    });

    function setCurrentTab(id: TabId) {
      state.currentTab = id;
      // Update potential parent v-model value
      if (['string', 'number'].includes(typeof props.modelValue)) {
        emit('update:modelValue', id);
      }
    }

    function registerTab(id: TabId) {
      state.tabs.push(id);

      if (state.tabs.length === 1 && !state.currentTab) {
        state.currentTab = id;
      }
    }

    // Provide api to sub-components
    const api: UseTabs = {
      uuid: uuid(),
      currentTab: computed(() => state.currentTab),
      tabs: computed(() => state.tabs),
      setCurrentTab,
      registerTab,
    };
    provide(TabsSymbol, api);

    // Watch potential parent v-model value changes and update state accordingly
    watchEffect(() => {
      if (['string', 'number'].includes(typeof props.modelValue)) {
        state.currentTab = props.modelValue;
      }
    });

    return () => {
      const tabsConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.tabs;
      const elementProps: Record<string, unknown> = {};

      if (!props.bare && tabsConfig?.tabsClass) {
        elementProps.class = tabsConfig?.tabsClass;
      }

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
