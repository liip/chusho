import { defineComponent, h, inject, mergeProps, reactive, toRef } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem from '../../composables/useInteractiveListItem';
import { UsePopupSymbol } from '../../composables/usePopup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

import { ComboboxSymbol } from './CCombobox';

export default defineComponent({
  name: 'CComboboxOption',

  mixins: [componentMixin],

  props: {
    /**
     * The value used when this option is selected.
     * @type {any}
     */
    value: {
      type: ALL_TYPES,
      required: true,
    },
    /**
     * Prevent selecting this option while still displaying it.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const popup = inject(UsePopupSymbol);
    const combobox = inject(ComboboxSymbol);

    if (!popup || !combobox) {
      throw new Error('CComboboxOption must be used inside a CCombobox');
    }

    const interactiveListItem = useInteractiveListItem({
      value: toRef(props, 'value'),
      disabled: toRef(props, 'disabled'),
      onSelect: () => {
        // This is only called when the option is selected through *click*
        popup.collapse({ restoreFocus: false });
      },
    });

    return {
      config: useComponentConfig('comboboxOption'),
      popup,
      interactiveListItem,
    };
  },

  render() {
    const state = reactive({
      active: this.interactiveListItem.active,
      selected: this.interactiveListItem.selected,
    });

    const elementProps: Record<string, unknown> = {
      ref: this.interactiveListItem.itemRef,
      ...this.interactiveListItem.attrs,
      ...this.interactiveListItem.events,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...state,
      }),
    };

    return h(
      'div',
      mergeProps(this.$attrs, elementProps),
      this.$slots.default?.(state) ??
        (this.$props.value ? String(this.$props.value) : ' ')
    );
  },
});
