import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import fieldMixin from '../mixins/fieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useFormGroup from '../../composables/useFormGroup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CCheckbox',

  mixins: [componentMixin, fieldMixin],

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

  emits: [
    /**
     * Emitted when the checkbox checked state changes.
     * @arg {any} modelValue `trueValue` or `falseValue` depending on the checkbox state.
     */
    'update:modelValue',
  ],

  setup(props) {
    const { formGroup, flags } = useFormGroup(props, ['required', 'disabled']);

    return {
      config: useComponentConfig('checkbox'),
      formGroup,
      flags,
    };
  },

  render() {
    const checked = this.modelValue === this.trueValue;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...this.flags,
        checked,
      }),
      type: 'checkbox',
      checked,
      id: this.$attrs.id ?? this.formGroup?.ids.field,
      onChange: (e: Event) => {
        const checked = (e.target as HTMLInputElement).checked;
        this.$emit(
          'update:modelValue',
          checked ? this.trueValue : this.falseValue
        );
      },
    };

    return h(
      'input',
      mergeProps(this.$attrs, elementProps, this.flags),
      this.$slots
    );
  },
});
