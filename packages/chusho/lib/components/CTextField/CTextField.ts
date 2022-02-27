import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

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

  setup() {
    return {
      config: useComponentConfig('textField'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, this.$props),
      type: this.type,
      value: this.modelValue,
      onInput: (e: KeyboardEvent) => {
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
    };

    return h('input', mergeProps(this.$attrs, elementProps));
  },
});
