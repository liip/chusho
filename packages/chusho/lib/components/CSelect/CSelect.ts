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
import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../mixins/componentMixin';
import useSelectable, {
  SelectedItem,
  UseSelectable,
} from '../../composables/useSelectable';
import useTogglable from '../../composables/useTogglable';
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
  disabled: ComputedRef<boolean>;
  togglable: ReturnType<typeof useTogglable>;
  selectable: UseSelectable<SelectOptionData>;
}

export default defineComponent({
  name: 'CSelect',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Bind the Select value with the parent component.
     * @type {any}
     */
    modelValue: {
      type: ALL_TYPES,
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
     * Forwarded to the underlying `input` holding the select value.
     */
    name: {
      type: String,
      default: null,
    },
    /**
     * Additional attributes to be applied to the hidden input holding the select value.
     * For example: `{ 'data-test': 'my-input' }`
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
    /**
     * Prevent opening the SelectOptions and therefor changing the Select value.
     */
    disabled: {
      type: Boolean,
      default: false,
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
      disabled: computed(() => props.disabled),
      togglable: useTogglable(props.open, 'open'),
      selectable: useSelectable<SelectOptionData>(),
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
          this.select.togglable.close();
          break;
      }
    },
  },

  /**
   * @slot
   * @binding {boolean} open `true` when the select is open
   */
  render() {
    const selectConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.select;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(selectConfig?.class, this.$props),
      onKeydown: this.handleKeydown,
    };
    const inputProps: Record<string, unknown> = {
      type: 'hidden',
      name: this.$props.name,
      value: this.$props.itemValue(this.$props.modelValue),
    };

    return h('div', mergeProps(this.$attrs, elementProps), {
      default: () => {
        const children =
          this.$slots?.default?.({
            open: this.select.togglable.isOpen.value,
          }) ?? [];
        children.unshift(h('input', mergeProps(this.$props.input, inputProps)));
        return children;
      },
    });
  },
});
