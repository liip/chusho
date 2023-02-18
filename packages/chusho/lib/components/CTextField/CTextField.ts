import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import textFieldMixin from '../mixins/textFieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup from '../../composables/useFormGroup';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CTextField',

  mixins: [componentMixin, textFieldMixin],

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

  emits: [
    /**
     * When the input value changes.
     * @arg {string} modelValue The input value.
     */
    'update:modelValue',
  ],

  setup(props) {
    const { formGroup, flags } = useFormGroup(props, [
      'required',
      'disabled',
      'readonly',
    ]);

    return {
      config: useComponentConfig('textField'),
      formGroup,
      flags,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...this.flags,
      }),
      type: this.type,
      value: this.modelValue,
      id: this.$attrs.id ?? this.formGroup?.ids.field,
      onInput: (e: KeyboardEvent) => {
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
    };

    return h('input', mergeProps(this.$attrs, elementProps, this.flags));
  },
});
