import {
  ref,
  provide,
  computed,
  InjectionKey,
  defineComponent,
  h,
  watchEffect,
  Ref,
} from '@vue/composition-api';
import uuid from '../../utils/uuid';

export const ToggleSymbol: InjectionKey<UseToggle> = Symbol();

export interface UseToggle {
  uuid: number;
  open: Readonly<Ref<boolean>>;
  toggle: () => void;
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

    function toggle() {
      open.value = !open.value;
      // Update potential parent v-model value
      emit('toggle', open.value);
    }

    // Provide api to sub-components
    const api: UseToggle = {
      uuid: uuid(),
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

    return () => h('div', slots.default && slots.default());
  },
});
