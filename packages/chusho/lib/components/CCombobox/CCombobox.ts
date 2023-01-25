import {
  InjectionKey,
  Ref,
  computed,
  defineComponent,
  h,
  mergeProps,
  provide,
  ref,
  watch,
  watchEffect,
} from 'vue';

import componentMixin from '../mixins/componentMixin';
import textFieldMixin from '../mixins/textFieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup, { UseFormGroup } from '../../composables/useFormGroup';
import useInteractiveList, {
  InteractiveListModes,
  InteractiveListRoles,
} from '../../composables/useInteractiveList';
import usePopup, { PopupType } from '../../composables/usePopup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import { isObject, isPrimitive } from '../../utils/objects';

export const ComboboxSymbol: InjectionKey<Combobox> = Symbol('CCombobox');

export interface Combobox {
  query: Ref<unknown>;
  syncValues: () => void;
  flags: UseFormGroup['flags'];
}

export default defineComponent({
  name: 'CCombobox',

  mixins: [componentMixin, textFieldMixin],

  props: {
    /**
     * Bind the Combobox value with the parent component.
     * @type {any}
     */
    modelValue: {
      type: ALL_TYPES,
      default: null,
    },
    /**
     * The default value of the Combobox to use when there’s no v-model (modelValue).
     * @type {any}
     */
    defaultValue: {
      type: ALL_TYPES,
      default: null,
    },
    /**
     * String representation of the value to display, essentially when the value is an object.
     * For example: `(option) => option.label`
     */
    displayValue: {
      type: Function,
      default: (item: unknown) => {
        if (isPrimitive(item)) {
          return item;
        } else if (isObject(item) && item.label) {
          return item.label;
        }
        return '';
      },
    },
    /**
     * Bind the ComboboxOptions opening state with the parent component.
     */
    open: {
      type: Boolean,
      default: false,
    },
    /**
     * Set the combobox value to `null` when the user clears the input or navigate away without selecting an option.
     */
    allowEmpty: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'update:open'],

  setup(props) {
    const { flags } = useFormGroup(props, ['required', 'disabled', 'readonly']);

    const popup = usePopup({
      expanded: props.open,
      expandedPropName: 'open',
      disabled: computed(() => flags.disabled || flags.readonly || false),
      disabledPropName: 'disabled',
      type: PopupType.listbox,
    });

    const interactiveList = useInteractiveList({
      mode: InteractiveListModes.activedescendant,
      role: InteractiveListRoles.listbox,
      initialValue: props.modelValue ?? props.defaultValue,
      skipDisabled: true,
      search: false,
    });

    const combobox: Combobox = {
      query: ref(props.displayValue(props.modelValue ?? props.defaultValue)),
      syncValues: () => {
        if (props.allowEmpty && combobox.query.value === '') {
          interactiveList.clearSelection();
        } else {
          combobox.query.value = props.displayValue(
            interactiveList.selection.value
          );
        }
      },
      flags,
    };

    provide(ComboboxSymbol, combobox);

    watch(interactiveList.selection, () => {
      combobox.query.value = props.displayValue(
        interactiveList.selection.value
      );
    });

    watch(popup.expanded, (expanded) => {
      if (expanded === false) {
        combobox.syncValues();
      }
    });

    watchEffect(() => {
      // When the popup is opened
      switch (popup.trigger.value) {
        case 'ArrowUp':
          interactiveList.activateItemAt(-1);
          break;
        default:
          interactiveList.activateItemAt(0);
          break;
      }
    });

    return {
      config: useComponentConfig('combobox'),
      interactiveList,
      popup,
      flags,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...this.flags,
        open: this.popup.expanded.value,
      }),
    };

    return h(
      'div',
      mergeProps(this.$attrs, elementProps),
      this.$slots.default?.({
        open: this.popup.expanded.value,
      })
    );
  },
});
