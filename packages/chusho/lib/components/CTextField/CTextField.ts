import { defineComponent, h, inject, mergeProps } from 'vue';
import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CTextField',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Usual HTML input element type attribute for textual input (text, email, tel, url, …)
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * Input value
     */
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  render() {
    const inputConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.textField;
    const attrs: Record<string, unknown> = {
      ...generateConfigClass(inputConfig?.class, this.$props),
      type: this.type,
      value: this.modelValue,
      onInput: (e: KeyboardEvent) => {
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
    };

    return h('input', mergeProps(this.$attrs, attrs));
  },
});
