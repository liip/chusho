import {
  provide,
  computed,
  InjectionKey,
  defineComponent,
  createElement,
  watchEffect,
  Ref,
  reactive,
} from '@vue/composition-api';
import uuid from '../../utils/uuid';
import { VNodeData } from 'vue/types/umd';
import TabsMixin from './mixin';

export const TabsSymbol: InjectionKey<object> = Symbol();

export declare type TabId = string | number;

interface TabsState {
  currentTab?: TabId;
  tabs: TabId[];
}

export interface UseTabs {
  uuid: number;
  currentTab: Readonly<Ref<TabId | undefined>>;
  tabs: Readonly<Ref<readonly TabId[]>>;
  setCurrentTab: Function;
  registerTab: Function;
}

interface TabsProps {
  currentTab?: TabId;
  defaultTab?: TabId;
  bare?: boolean;
}

export default defineComponent<TabsProps>({
  name: 'CTabs',

  mixins: [TabsMixin],

  model: {
    prop: 'currentTab',
    event: 'change',
  },

  props: {
    /**
     * Optionally bind the Tabs state with the parent component.
     */
    currentTab: {
      type: [Number, String],
      default: null,
    },
    /**
     * The id of the Tab to display by default. This will be ignored if `v-model` is used.
     *
     * Defaults to the first tab.
     */
    defaultTab: {
      type: [Number, String],
      default: null,
    },
  },

  setup(props, { slots, attrs, parent, emit }) {
    const tabsConfig = parent!.$chusho?.options?.components?.tabs;
    const state = reactive<TabsState>({
      currentTab: props.currentTab || props.defaultTab,
      tabs: [],
    });

    function setCurrentTab(id: TabId): void {
      state.currentTab = id;
      // Update potential parent v-model value
      emit('change', id);
    }

    function registerTab(id: TabId): void {
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
      if (props.currentTab) {
        state.currentTab = props.currentTab;
      }
    });

    const componentData: VNodeData = {
      attrs,
      class: props.bare ? null : tabsConfig?.tabsClass,
    };

    return () => {
      return createElement(
        'div',
        componentData,
        slots.default && slots.default()
      );
    };
  },
});
