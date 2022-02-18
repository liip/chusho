import { defineComponent, h, inject, mergeProps } from 'vue';
import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';

export default defineComponent({
  name: 'CTextarea',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Textarea value
     */
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  render() {
    const inputConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.textarea;
    const attrs: Record<string, unknown> = {
      ...generateConfigClass(inputConfig?.class, this.$props),
      value: this.modelValue,
      onInput: (e: KeyboardEvent) => {
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
    };

    return h('textarea', mergeProps(this.$attrs, attrs));
  },
});
