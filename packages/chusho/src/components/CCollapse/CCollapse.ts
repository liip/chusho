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
import componentMixin from '../mixin';

export const CollapseSymbol: InjectionKey<UseCollapse> = Symbol();

export interface UseCollapse {
  uuid: string;
  open: Readonly<Ref<boolean>>;
  toggle: () => void;
}

export default defineComponent({
  name: 'CCollapse',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Optionally bind the Collapse state with the parent component.
     */
    modelValue: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const open = ref(false);

    function toggle() {
      open.value = !open.value;
      // Update potential parent v-model value
      if (typeof props.modelValue === 'boolean') {
        emit('update:modelValue', open.value);
      }
    }

    // Provide api to sub-components
    const api: UseCollapse = {
      uuid: uuid('chusho-collapse'),
      open: computed(() => open.value),
      toggle,
    };

    provide(CollapseSymbol, api);

    // Watch potential parent v-model value changes and update state accordingly
    watchEffect(() => {
      if (typeof props.modelValue === 'boolean') {
        open.value = props.modelValue;
      }
    });

    return {
      collapse: api,
    };
  },

  render() {
    const collapseConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.collapse;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(collapseConfig?.class, {
        ...this.$props,
        active: this.collapse.open.value,
      }),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
