import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CAlert',

  mixins: [componentMixin],

  setup() {
    return {
      config: useComponentConfig('alert'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'alert',
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
