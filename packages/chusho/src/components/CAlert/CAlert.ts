import { DollarChusho } from '../../types';
import { defineComponent, h, inject, mergeProps } from 'vue';
import { warn } from '../../utils/debug';

export default defineComponent({
  name: 'CAlert',

  inheritAttrs: false,

  props: {
    /**
     * Customize the alert appearance by applying a variant defined in the config (alert.variants).
     */
    variant: {
      type: String,
      default: null,
    },
  },

  setup(props, { attrs, slots }) {
    return () => {
      const alertConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.alert;
      const classes = [];

      if (alertConfig?.defaultClass) {
        classes.push(alertConfig.defaultClass);
      }

      if (props.variant) {
        const variants = props.variant.split(' ');
        variants.forEach((variant) => {
          const target = alertConfig?.variants?.[variant];

          if (target) {
            classes.push(target);
          } else {
            warn(
              `Cannot find an Alert variant named “${variant}” under “alert.variants” defined in the config, you must define it before referencing it.`
            );
          }
        });
      }

      const extraProps: Record<string, unknown> = {
        role: 'alert',
      };

      if (classes.length) {
        extraProps['class'] = classes;
      }

      return h('div', mergeProps(attrs, extraProps), slots);
    };
  },
});
