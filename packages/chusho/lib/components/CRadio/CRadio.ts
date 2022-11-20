import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import fieldMixin from '../mixins/fieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup from '../../composables/useFormGroup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CRadio',

  mixins: [componentMixin, fieldMixin],

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

  setup(props) {
    const { formGroup, flags } = useFormGroup(props, ['required', 'disabled']);

    return {
      config: useComponentConfig('radio'),
      formGroup,
      flags,
    };
  },

  render() {
    const checked = this.modelValue === this.value;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...this.flags,
        checked,
      }),
      type: 'radio',
      value: this.$props.value,
      checked,
      id: this.$attrs.id ?? this.formGroup?.ids.field,
      onChange: () => this.$emit('update:modelValue', this.$props.value),
    };

    return h(
      'input',
      mergeProps(this.$attrs, elementProps, this.flags),
      this.$slots
    );
  },
});
