import {
  defineComponent,
  h,
  inject,
  mergeProps,
  PropType,
  resolveComponent,
} from 'vue';
import { RouteLocationRaw } from 'vue-router';

import { DollarChusho } from '../../types';
import { warn } from '../../utils/debug';

export default defineComponent({
  name: 'CBtn',

  inheritAttrs: false,

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
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: null,
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
      default: null,
    },

    /**
     * Disable the button (doesn’t apply to links) and apply the associated class from the config (btn.disabledClass).
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { attrs, slots }) {
    return () => {
      const btnConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.btn;
      const classes = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let tag: any = 'button';
      let extraAttrs: Record<string, unknown> = {};

      if (props.to) {
        // TODO: Update logic once we know how to detect Nuxt with Vue 3
        tag = resolveComponent('router-link');

        if (tag === 'router-link') {
          warn(
            `CBtn got a “to” prop but RouterLink component couldn’t be found. Is Vue Router installed? To make a CBtn behave like a traditional link, use the prop “href” instead.`
          );
        }

        extraAttrs = {
          to: props.to,
        };
      } else if (props.href) {
        tag = 'a';
        extraAttrs = {
          href: props.href,
        };
      }

      if (btnConfig) {
        if (btnConfig.defaultClass) {
          classes.push(btnConfig.defaultClass);
        }
        if (btnConfig.disabledClass && props.disabled) {
          classes.push(btnConfig.disabledClass);
        }

        if (props.variant) {
          const variants = props.variant.split(' ');
          variants.forEach((variant: string) => {
            const target = btnConfig?.variants?.[variant];
            if (target) {
              classes.push(target);
            } else {
              warn(
                `Cannot find Button variant named “${variant}” under “button.variants” defined in the config, you must define it before referencing it.`
              );
            }
          });
        }
      }

      const elementProps: Record<string, unknown> = {
        ...extraAttrs,
        // Concerns only on button tags, skip for anchors
        ...(props.disabled && tag === 'button' && { disabled: true }),
        ...(props.type && tag === 'button' && { type: props.type }),
      };

      if (classes.length) {
        elementProps.class = classes;
      }

      return h(tag, mergeProps(attrs, elementProps), slots);
    };
  },
});
