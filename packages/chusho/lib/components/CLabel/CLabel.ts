import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

import { FormGroupSymbol } from '../CFormGroup/CFormGroup';

export default defineComponent({
  name: 'CLabel',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    return {
      config: useComponentConfig('label'),
      formGroup: inject(FormGroupSymbol, null),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, this.$props),
      id: this.$attrs.id ?? this.formGroup?.ids.label,
      for: this.$attrs.for ?? this.formGroup?.ids.field,
    };

    return h('label', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
