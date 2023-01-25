import { PropType, defineComponent, h, mergeProps, nextTick, watch } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup from '../../composables/useFormGroup';
import useInteractiveList, {
  InteractiveListRoles,
} from '../../composables/useInteractiveList';
import usePopup, { PopupType } from '../../composables/usePopup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import { isObject, isPrimitive } from '../../utils/objects';

export default defineComponent({
  name: 'CSelect',

  mixins: [componentMixin],

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
     * String representation of the value for the underlying hidden input, essentially when the value is an object.
     * For example: `(option) => option.id`
     */
    itemValue: {
      type: Function as PropType<(item: unknown) => string>,
      default: (item: unknown) => {
        if (isPrimitive(item)) {
          return item;
        } else if (isObject(item) && item.value) {
          return item.value;
        }
        return '';
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

  emits: [
    /**
     * When the selected value changes.
     * @arg {any} modelValue The selected item value.
     */
    'update:modelValue',
    /**
     * When the popup opens or closes.
     * @arg {boolean} open Whether the popup is open or not.
     */
    'update:open',
  ],

  setup(props) {
    const formGroup = useFormGroup(props, ['disabled']);

    const popup = usePopup({
      expanded: props.open,
      expandedPropName: 'open',
      disabled: props.disabled ?? formGroup.flags.disabled,
      disabledPropName: 'disabled',
      type: PopupType.listbox,
    });

    const interactiveList = useInteractiveList({
      role: InteractiveListRoles.listbox,
      initialValue: props.modelValue,
    });

    watch(
      () => popup.expanded.value,
      () => {
        nextTick(() => {
          if (popup.expanded.value) {
            // Focus the first selected item if there’s one
            const val = interactiveList.selection.value;

            if (val) {
              const value = Array.isArray(val) ? val[0] : val;
              const index = interactiveList.items.value.findIndex(
                (item) => item.value === value
              );

              if (index > -1) {
                interactiveList.activateItemAt(index);
                return;
              }
            }

            // Otherwise focus the first item
            interactiveList.activateItemAt(0);
          } else {
            interactiveList.clearActiveItem();
          }
        });
      },
      {
        // Ensure we focus an item when the popup is open by default
        immediate: true,
      }
    );

    return {
      config: useComponentConfig('select'),
      interactiveList,
      popup,
    };
  },

  /**
   * @slot
   * @binding {boolean} open `true` when the select is open
   */
  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        disabled: this.popup.disabled.value,
        open: this.popup.expanded.value,
      }),
      ...this.popup.attrs,
    };
    const inputProps: Record<string, unknown> = {
      type: 'hidden',
      name: this.name,
      value: this.displayValue(this.modelValue),
    };

    return h('div', mergeProps(this.$attrs, elementProps), {
      default: () => {
        const children =
          this.$slots?.default?.({
            open: this.popup.expanded.value,
          }) ?? [];
        children.unshift(h('input', mergeProps(this.input, inputProps)));
        return children;
      },
    });
  },
});
