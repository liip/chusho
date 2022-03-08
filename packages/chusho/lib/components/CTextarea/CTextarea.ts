import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import textFieldMixin from '../mixins/textFieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CTextarea',

  mixins: [componentMixin, textFieldMixin],

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

  setup() {
    return {
      config: useComponentConfig('textarea'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, this.$props),
      value: this.modelValue,
      onInput: (e: KeyboardEvent) => {
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
    };

    return h('textarea', mergeProps(this.$attrs, elementProps));
  },
});
