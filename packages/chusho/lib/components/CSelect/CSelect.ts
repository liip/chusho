import {
  InjectionKey,
  Ref,
  defineComponent,
  h,
  mergeProps,
  provide,
  toRef,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup from '../../composables/useFormGroup';
import useSelectable, {
  SelectedItem,
  UseSelectable,
} from '../../composables/useSelectable';
import useTogglable from '../../composables/useTogglable';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import { isObject, isPrimitive } from '../../utils/objects';

export const SelectSymbol: InjectionKey<Select> = Symbol('CSelect');

type SelectValue = unknown;

export interface SelectOptionData {
  disabled: boolean;
  text: string;
}

export type SelectOption = SelectedItem<SelectOptionData>;

export interface Select {
  value: Ref<SelectValue>;
  setValue: (value: SelectValue) => void;
  disabled: Ref<boolean | undefined>;
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
      default: null,
    },
  },

  emits: ['update:modelValue', 'update:open'],

  setup(props, { emit }) {
    const { flags } = useFormGroup(props, ['disabled']);

    const select: Select = {
      value: toRef(props, 'modelValue'),
      setValue: (value: unknown) => {
        emit('update:modelValue', value);
      },
      disabled: toRef(flags, 'disabled'),
      togglable: useTogglable(props.open, 'open'),
      selectable: useSelectable<SelectOptionData>(),
    };

    provide(SelectSymbol, select);

    return {
      config: useComponentConfig('select'),
      select,
    };
  },

  methods: {
    handleKeydown(e: KeyboardEvent) {
      if (['Tab', 'Esc', 'Escape'].includes(e.key)) {
        this.select.togglable.close();
      }
    },
  },

  /**
   * @slot
   * @binding {boolean} open `true` when the select is open
   */
  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        disabled: this.select.disabled.value,
      }),
      ...this.select.togglable.uid.cacheAttrs,
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
