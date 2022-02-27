import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /**
     * Useful when used in the component config `class` option, to style it conditionally. See [styling components](/guide/styling-components/).
     */
    variant: {
      type: [String, Array],
      default: null,
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
