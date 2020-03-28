import Vue, { VNodeData } from 'vue';
import { mergeData } from 'vue-functional-data-merge';
import { VNode } from 'vue/types/umd';

interface BtnProps {
  href: string;
  to: string | object;
  type: string;
  variant: string;
  disabled: boolean;
}

export default Vue.extend<BtnProps>({
  name: 'CBtn',

  functional: true,

  props: {
    /**
     * Make the button a link to the given location
     */
    href: {
      type: String,
      default: null,
    },

    /**
     * Use a `router-link` (or `nuxt-link` in a Nuxt app) in the background, works juste like the `router-link` prop of the same name.
     *
     * Note that you can also pass all other `router-link` props such as `activeClass`, `replace`, … See [Vue router documentation](https://router.vuejs.org/api/#router-link) for a complete list of available props.
     */
    to: {
      type: [String, Object],
    },

    /**
     * In case the Btn is a `button` element, specify its type
     */
    type: {
      type: String,
      default: 'button',
    },

    /**
     * Customize the button appearance by applying one or multiple variants defined in the config (btn.variants). Multiple variants should be separated by a space.
     *
     * Example: `"primary large"`
     */
    variant: {
      type: String,
      default: '',
    },

    /**
     * Disable the button (doesn’t apply to links) and apply the associated class from the config (btn.disabledClass).
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  render(h, { props, data, parent, children }): VNode {
    const btnConfig = parent?.$chusho?.options?.components?.btn;
    const classes = [];
    let tag = 'button';
    let attrs = {};

    if (props.to) {
      tag = parent.$nuxt ? 'nuxt-link' : 'router-link';
      attrs = {
        to: props.to,
      };
    } else if (props.href) {
      tag = 'a';
      attrs = {
        href: props.href,
      };
    }

    if (btnConfig) {
      if (btnConfig.defaultClass) classes.push(btnConfig.defaultClass);
      if (btnConfig.disabledClass) {
        classes.push({
          [btnConfig.disabledClass]: props.disabled,
        });
      }

      const variants = props.variant.split(' ');
      variants.forEach((variant) => {
        const target = btnConfig?.variants?.[variant];
        if (target) classes.push(target);
      });
    }

    const componentData: VNodeData = {
      class: classes,
      attrs: {
        ...attrs,
        // Concerns only on button tags, skip for anchors
        ...(props.disabled && tag === 'button' && { disabled: true }),
        ...(props.type && tag === 'button' && { type: props.type }),
      },
    };

    return h(tag, mergeData(data, componentData), children);
  },
});
