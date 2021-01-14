import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  mergeProps,
  nextTick,
  onMounted,
  ref,
} from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../mixins/componentMixin';
import { SelectSymbol } from './CSelect';

export default defineComponent({
  name: 'CSelectOption',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number, Array, Object],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const select = inject(SelectSymbol);
    const id = uuid('chusho-select-option');
    const data = ref({ disabled: props.disabled, text: '' });

    select?.selected.addItem(id, data);

    onMounted(() => {
      const vm = getCurrentInstance();
      if (vm?.proxy) {
        const text = vm.proxy.$el.textContent.toLowerCase().trim();
        data.value.text = text;
      }
    });

    if (props.value === select?.value.value) {
      select?.selected.setSelectedItem(id);
    }

    return {
      select,
      id,
      isActive: computed(() => props.value === select?.value.value),
      isFocused: computed(() => id === select?.selected.selectedItemId.value),
    };
  },

  beforeUnmount() {
    this.select?.selected.removeItem(this.id);
  },

  render() {
    const selectOptionConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.selectOption;

    const saveAndClose = () => {
      this.select?.setValue(this.value);
      this.select?.toggle.close();
    };

    const elementProps: Record<string, unknown> = {
      id: this.id,
      role: 'option',
      tabindex: '-1',
      ...(this.isActive ? { 'aria-selected': 'true' } : {}),
      ...(this.disabled
        ? { 'aria-disabled': 'true' }
        : {
            onClick: saveAndClose,
            onKeydown: (e: KeyboardEvent) => {
              if (['Enter', 'Spacebar', ' '].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
                saveAndClose();
              }
            },
          }),
      ...generateConfigClass(selectOptionConfig?.class, {
        ...this.$props,
        active: this.isActive,
        focus: this.isFocused,
      }),
    };

    if (this.isFocused) {
      nextTick(() => {
        this.$el.focus();
      });
    }

    return h(
      'li',
      mergeProps(this.$attrs, elementProps),
      this.$slots.default?.() ?? ' '
    );
  },
});
