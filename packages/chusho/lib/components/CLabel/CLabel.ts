import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CLabel',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    return {
      config: useComponentConfig('label'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('label', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
