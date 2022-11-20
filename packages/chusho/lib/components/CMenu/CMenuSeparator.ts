import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CMenuSeparator',

  mixins: [componentMixin],

  setup() {
    return {
      config: useComponentConfig('menuSeparator'),
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'separator',
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('li', mergeProps(this.$attrs, elementProps));
  },
});
