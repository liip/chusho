import {
  ref,
  provide,
  computed,
  InjectionKey,
  defineComponent,
  watchEffect,
  Ref,
  h,
  inject,
  mergeProps,
} from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../shared';

export const ToggleSymbol: InjectionKey<UseToggle> = Symbol();

export interface UseToggle {
  uuid: string;
  open: Readonly<Ref<boolean>>;
  toggle: () => void;
}

export default defineComponent({
  name: 'CToggle',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Optionally bind the Toggle state with the parent component.
     */
    modelValue: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { attrs, slots, emit }) {
    const open = ref(false);

    function toggle() {
      open.value = !open.value;
      // Update potential parent v-model value
      if (typeof props.modelValue === 'boolean') {
        emit('update:modelValue', open.value);
      }
    }

    // Provide api to sub-components
    const api: UseToggle = {
      uuid: uuid('chusho-toggle'),
      open: computed(() => open.value),
      toggle,
    };

    provide(ToggleSymbol, api);

    // Watch potential parent v-model value changes and update state accordingly
    watchEffect(() => {
      if (typeof props.modelValue === 'boolean') {
        open.value = props.modelValue;
      }
    });

    return () => {
      const toggleConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.toggle;
      const elementProps: Record<string, unknown> = {
        ...generateConfigClass(toggleConfig?.class, props),
      };

      return h('div', mergeProps(attrs, elementProps), slots?.default?.());
    };
  },
});
