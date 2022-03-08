import { defineComponent } from 'vue';

import fieldMixin from './fieldMixin';

export default defineComponent({
  mixins: [fieldMixin],

  props: {
    /**
     * Set the HTML readonly attribute
     */
    readonly: {
      type: Boolean,
      default: null,
    },
  },
});
