import {
  ref,
  provide,
  computed,
  InjectionKey,
  defineComponent,
  createElement,
  watchEffect,
  Ref,
} from '@vue/composition-api';

export const ToggleSymbol: InjectionKey<object> = Symbol();

export interface UseToggle {
  open: Readonly<Ref<boolean>>;
  toggle: Function;
}

interface ToggleProps {
  open: boolean;
}

export default defineComponent<ToggleProps>({
  name: 'CToggle',

  model: {
    prop: 'open',
    event: 'toggle',
  },

  props: {
    /**
     * Optionally bind the Toggle state with the parent component.
     */
    open: {
      type: Boolean,
      default: undefined,
    },
  },

  setup(props, { slots, emit }) {
    const open = ref(false);

    function toggle(): void {
      open.value = !open.value;
      // Update potential parent v-model value
      emit('toggle', open.value);
    }

    // Provide api to sub-components
    const api: UseToggle = {
      open: computed(() => open.value),
      toggle,
    };
    provide(ToggleSymbol, api);

    // Watch potential parent v-model value changes and update state accordingly
    watchEffect(() => {
      if (typeof props.open === 'boolean') {
        open.value = props.open;
      }
    });

    return () => createElement('div', slots.default && slots.default());
  },
});
