import { BaseTransitionProps, PropType } from 'vue';

export default {
  props: {
    /**
     * The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).
     *
     * For example: `{ name: "fade", mode: "out-in" }`.
     *
     * If you defined a default transition in the config and want to disable it, use `false`.
     */
    transition: {
      type: [Object, Boolean] as PropType<BaseTransitionProps | false>,
      default: null,
    },
  },
};
