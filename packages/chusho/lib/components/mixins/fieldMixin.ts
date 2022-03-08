import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /**
     * Set the HTML disabled attribute
     */
    disabled: {
      type: Boolean,
      default: null,
    },

    /**
     * Set the HTML required attribute
     */
    required: {
      type: Boolean,
      default: null,
    },
  },
});
