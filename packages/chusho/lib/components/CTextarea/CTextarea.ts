import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import textFieldMixin from '../mixins/textFieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup from '../../composables/useFormGroup';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CTextarea',

  mixins: [componentMixin, textFieldMixin],

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

  setup(props) {
    const { formGroup, flags } = useFormGroup(props, [
      'required',
      'disabled',
      'readonly',
    ]);

    return {
      config: useComponentConfig('textarea'),
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
      value: this.modelValue,
      id: this.$attrs.id ?? this.formGroup?.ids.field,
      onInput: (e: KeyboardEvent) => {
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
    };

    return h('textarea', mergeProps(this.$attrs, elementProps, this.flags));
  },
});
