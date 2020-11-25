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
import { generateConfigClass } from '../../utils/components';
import { warn } from '../../utils/debug';
import componentMixin from '../shared';

export default defineComponent({
  name: 'CBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Make the button a link to the given URL.
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
     * Specifies the button type, does not apply when `to` or `href` props are used. Example: `submit`.
     */
    type: {
      type: String,
      default: 'button',
    },

    /**
     * Disable the button, does not apply when `to` or `href` props are used.
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

      const elementProps: Record<string, unknown> = {
        ...extraAttrs,
        // Concerns only on button tags, skip for anchors
        ...(props.disabled && tag === 'button' && { disabled: true }),
        ...(props.type && tag === 'button' && { type: props.type }),
        ...generateConfigClass(btnConfig?.class, props),
      };

      return h(tag, mergeProps(attrs, elementProps), slots);
    };
  },
});
