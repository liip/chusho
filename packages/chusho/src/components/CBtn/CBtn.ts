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
import componentMixin from '../mixin';

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

  render() {
    const btnConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.btn;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tag: any = 'button';
    let extraAttrs: Record<string, unknown> = {};

    if (this.to) {
      tag = resolveComponent('router-link');

      if (tag === 'router-link') {
        warn(
          `CBtn got a “to” prop but RouterLink component couldn’t be found. Is Vue Router installed? To make a CBtn behave like a traditional link, use the prop “href” instead.`
        );
      }

      extraAttrs = {
        to: this.to,
      };
    } else if (this.href) {
      tag = 'a';
      extraAttrs = {
        href: this.href,
      };
    }

    const elementProps: Record<string, unknown> = {
      ...extraAttrs,
      // Concerns only on button tags, skip for anchors
      ...(this.disabled && tag === 'button' && { disabled: true }),
      ...(this.type && tag === 'button' && { type: this.type }),
      ...generateConfigClass(btnConfig?.class, this.$props),
    };

    return h(tag, mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
