import {
  computed,
  ComputedRef,
  defineComponent,
  h,
  inject,
  InjectionKey,
  mergeProps,
  provide,
} from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../mixins/componentMixin';
import useSelected, {
  SelectedItem,
  UseSelected,
} from '../../composables/useSelected';
import useToggle from '../../composables/useToggle';
import { isObject, isPrimitive } from '../../utils/objects';

export const SelectSymbol: InjectionKey<UseSelect> = Symbol('CSelect');

type SelectValue = unknown;

export interface SelectOptionData {
  disabled: boolean;
  text: string;
}

export type SelectOption = SelectedItem<SelectOptionData>;

export interface UseSelect {
  uuid: string;
  value: ComputedRef<SelectValue>;
  setValue: (value: SelectValue) => void;
  toggle: ReturnType<typeof useToggle>;
  selected: UseSelected<SelectOptionData>;
}

export default defineComponent({
  name: 'CSelect',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Bind the Select value with the parent component.
     */
    modelValue: {
      type: [String, Number, Array, Object],
      default: null,
    },
    /**
     * Bind the SelectOptions opening state with the parent component.
     */
    open: {
      type: Boolean,
      default: false,
    },
    /**
     * Attributes to be applied to the hidden input holding the select value.
     * For example: `{ required: true }`
     */
    input: {
      type: Object,
      default: null,
    },
    /**
     * Method to resolve the currently selected item value.
     * For example: `(item) => item.value`
     */
    itemValue: {
      type: Function,
      default: (item: unknown) => {
        if (isPrimitive(item)) {
          return item;
        } else if (isObject(item) && item.value) {
          return item.value;
        }
        return null;
      },
    },
  },

  emits: ['update:modelValue', 'update:open'],

  setup(props, { emit }) {
    const api: UseSelect = {
      uuid: uuid('chusho-select'),
      value: computed(() => props.modelValue),
      setValue: (value: unknown) => {
        emit('update:modelValue', value);
      },
      toggle: useToggle(props.open, 'open'),
      selected: useSelected<SelectOptionData>(),
    };

    provide(SelectSymbol, api);

    return {
      select: api,
    };
  },

  methods: {
    handleKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Tab':
        case 'Esc':
        case 'Escape':
          this.select.toggle.close();
          break;
      }
    },
  },

  render() {
    const selectConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.select;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(selectConfig?.class, this.$props),
      onKeydown: this.handleKeydown,
    };
    const inputProps: Record<string, unknown> = {
      type: 'hidden',
      value: this.$props.itemValue(this.$props.modelValue),
    };

    return h('div', mergeProps(this.$attrs, elementProps), [
      h('input', mergeProps(this.$props.input, inputProps)),
      this.$slots?.default?.(),
    ]);
  },
});
