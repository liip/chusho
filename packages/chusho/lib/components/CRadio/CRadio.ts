import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import fieldMixin from '../mixins/fieldMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CRadio',

  mixins: [componentMixin, fieldMixin],

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

  setup() {
    return {
      config: useComponentConfig('radio'),
    };
  },

  render() {
    const checked = this.modelValue === this.value;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        checked,
      }),
      type: 'radio',
      value: this.$props.value,
      checked,
      onChange: () => this.$emit('update:modelValue', this.$props.value),
    };

    return h('input', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
