import { PropType, defineComponent } from 'vue';

import { RawVariant } from '../../utils/components';

export default defineComponent({
  inheritAttrs: false,

  props: {
    /**
     * Useful when used in the component config `class` option, to style it conditionally. See [styling components](/guide/styling-components/).
     */
    variant: {
      type: [String, Array, Object] as PropType<RawVariant>,
      default: undefined,
    },

    /**
     * Disable class inheritance from the component config. See [styling components](/guide/styling-components/).
     */
    bare: {
      type: Boolean,
      default: false,
    },
  },
});
