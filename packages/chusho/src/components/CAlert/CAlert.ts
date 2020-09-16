import Vue, { VNodeData } from 'vue';
import { mergeData } from 'vue-functional-data-merge';
import { VNode } from 'vue/types/umd';
import { warn } from '../../utils/debug';

interface AlertProps {
  variant?: string;
}

export default Vue.extend<AlertProps>({
  name: 'CAlert',

  functional: true,

  props: {
    /**
     * Customize the alert appearance by applying a variant defined in the config (alert.variants).
     */
    variant: {
      type: String,
      default: null,
    },
  },

  render(h, { props, data, parent, children }): VNode {
    const alertConfig = parent?.$chusho?.options?.components?.alert;
    const classes = [];

    if (alertConfig) {
      if (alertConfig.defaultClass) {
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
    }

    const componentData: VNodeData = {
      attrs: {
        role: 'alert',
      },
    };

    if (classes.length) {
      componentData.class = classes;
    }

    return h('div', mergeData(data, componentData), children);
  },
});
