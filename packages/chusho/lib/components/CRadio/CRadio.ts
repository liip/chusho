import { defineComponent, h, inject, mergeProps } from 'vue';
import { DollarChusho } from '../../types';
import { ALL_TYPES, generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CRadio',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Bind the Radio state with the parent component.
     * @type {any}
     */
    modelValue: {
      type: ALL_TYPES,
      default: null,
    },
    /**
     * The value to be used when the Radio is checked.
     * @type {any}
     */
    value: {
      type: ALL_TYPES,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  render() {
    const radioConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.radio;
    const checked = this.modelValue === this.value;
    const attrs: Record<string, unknown> = {
      ...generateConfigClass(radioConfig?.class, {
        ...this.$props,
        checked,
      }),
      type: 'radio',
      value: this.$props.value,
      checked,
      onChange: () => this.$emit('update:modelValue', this.$props.value),
    };

    return h('input', mergeProps(this.$attrs, attrs), this.$slots);
  },
});
