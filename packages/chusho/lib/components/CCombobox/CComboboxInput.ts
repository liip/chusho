import {
  defineComponent,
  h,
  inject,
  mergeProps,
  ref,
  watch,
  watchEffect,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { UseInteractiveListSymbol } from '../../composables/useInteractiveList';
import { UsePopupSymbol } from '../../composables/usePopup';

import { generateConfigClass, getElement } from '../../utils/components';

import { ComboboxSymbol } from './CCombobox';

export default defineComponent({
  name: 'CComboboxInput',

  mixins: [componentMixin],

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const combobox = inject(ComboboxSymbol);
    const popup = inject(UsePopupSymbol);
    const interactiveList = inject(UseInteractiveListSymbol);
    const elementRef = ref();

    if (!interactiveList || !popup || !combobox) {
      throw new Error('CComboboxInput must be used inside a CCombobox');
    }

    watchEffect(() => {
      // Focus the input when the popup is expanded through a click on the CComboboxBtn
      if (popup.trigger.value === 'Click') {
        getElement(elementRef).focus();
      }
    });

    watch(
      combobox.query,
      (query) => {
        emit('update:modelValue', query);
      },
      { immediate: true }
    );

    return {
      config: useComponentConfig('comboboxInput'),
      combobox,
      popup,
      interactiveList,
      elementRef,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...this.combobox.flags,
      }),
      ...this.combobox.flags,
      ref: 'elementRef',
      type: 'text',
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-controls': this.popup?.uid.id.value,
      'aria-expanded': this.popup?.expanded.value.toString(),
      'aria-activedescendant': this.interactiveList.activeItem.value,
      value: this.combobox.query.value,
      modelValue: undefined, // Prevent user `v-model` from being applied to the input
      onInput: (e: InputEvent) => {
        const query = (e.target as HTMLInputElement).value;
        this.combobox.query.value = query;

        if ((e.target as HTMLInputElement).value.length > 0) {
          if (this.popup?.expanded.value === false) {
            this.popup?.expand();
          }
        }
      },
      onKeydown: (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.popup?.expanded.value === true) {
          this.popup?.collapse({ restoreFocus: false });
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (e.key === 'Tab') {
          this.popup?.collapse({ restoreFocus: false });
          return;
        }

        if (e.key === 'Enter' && this.popup?.expanded.value === true) {
          this.interactiveList.selectActiveItem();
          this.popup?.collapse({ restoreFocus: false });
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (
          ['ArrowDown', 'ArrowUp'].includes(e.key) &&
          this.popup?.expanded.value === false
        ) {
          this.popup.expand(e.key);
          e.preventDefault();
          e.stopPropagation();
        }

        // Skip interactive list left/right arrow key handling
        // so that the cursor can move freely in the input
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
          return;
        }

        this.interactiveList.events.onKeydown(e);
      },
      onBlur: () => {
        this.combobox.syncValues();
      },
    };

    return h('input', mergeProps(this.$attrs, elementProps));
  },
});
