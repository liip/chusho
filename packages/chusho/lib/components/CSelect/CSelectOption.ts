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

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import { isClient } from '../../utils/ssr';
import uid from '../../utils/uid';

import { SelectSymbol } from './CSelect';

export default defineComponent({
  name: 'CSelectOption',

  mixins: [componentMixin],

  inheritAttrs: false,

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
    const select = inject(SelectSymbol);
    const id = uid('chusho-select-option');
    const data = ref({ disabled: props.disabled, text: '' });

    select?.selectable.addItem(id, data);

    onMounted(() => {
      const vm = getCurrentInstance();
      if (vm?.proxy) {
        const text = vm.proxy.$el.textContent.toLowerCase().trim();
        data.value.text = text;
      }
    });

    if (props.value === select?.value.value) {
      select?.selectable.setSelectedItem(id);
    }

    return {
      config: useComponentConfig('selectOption'),
      select,
      id,
      isActive: computed(() => props.value === select?.value.value),
      isFocused: computed(() => id === select?.selectable.selectedItemId.value),
    };
  },

  beforeUnmount() {
    this.select?.selectable.removeItem(this.id);
  },

  render() {
    const saveAndClose = () => {
      this.select?.setValue(this.value);
      this.select?.togglable.close();
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
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: this.isActive,
        focus: this.isFocused,
      }),
    };

    if (isClient && this.isFocused) {
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
