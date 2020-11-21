import {
  ref,
  provide,
  computed,
  InjectionKey,
  defineComponent,
  watchEffect,
  Ref,
} from 'vue';
import uuid from '../../utils/uuid';

export const ToggleSymbol: InjectionKey<UseToggle> = Symbol();

export interface UseToggle {
  uuid: string;
  open: Readonly<Ref<boolean>>;
  toggle: () => void;
}

export default defineComponent({
  name: 'CToggle',

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

  setup(props, { slots, emit }) {
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

    return () => slots?.default?.();
  },
});
