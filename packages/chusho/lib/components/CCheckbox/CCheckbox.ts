import { defineComponent, h, inject, mergeProps } from 'vue';
import { DollarChusho } from '../../types';
import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CCheckbox',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Bind the Checkbox state with the parent component.
     * @type {any}
     */
    modelValue: {
      type: ALL_TYPES,
      default: null,
    },
    /**
     * Value set when the checkbox is checked.
     * @type {any}
     */
    trueValue: {
      type: ALL_TYPES,
      default: true,
    },
    /**
     * Value set when the checkbox is unchecked.
     * @type {any}
     */
    falseValue: {
      type: ALL_TYPES,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  render() {
    const checkboxConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.checkbox;
    const checked = this.modelValue === this.trueValue;
    const attrs: Record<string, unknown> = {
      ...generateConfigClass(checkboxConfig?.class, {
        ...this.$props,
        checked,
      }),
      type: 'checkbox',
      checked,
      onChange: (e: Event) => {
        const checked = (e.target as HTMLInputElement).checked;
        this.$emit(
          'update:modelValue',
          checked ? this.trueValue : this.falseValue
        );
      },
    };

    return h('input', mergeProps(this.$attrs, attrs), this.$slots);
  },
});
