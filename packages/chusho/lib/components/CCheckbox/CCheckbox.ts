import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import fieldMixin from '../mixins/fieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CCheckbox',

  mixins: [componentMixin, fieldMixin],

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

  setup() {
    return {
      config: useComponentConfig('checkbox'),
    };
  },

  render() {
    const checked = this.modelValue === this.trueValue;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
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

    return h('input', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
