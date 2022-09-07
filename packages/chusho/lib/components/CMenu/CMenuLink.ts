import { PropType, defineComponent, h, inject } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem from '../../composables/useInteractiveListItem';
import useLink from '../../composables/useLink';

import { generateConfigClass } from '../../utils/components';

import { MenuSymbol } from './CMenu';
import { CMenuListKey } from './CMenuList';

export default defineComponent({
  name: 'CMenuLink',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: null,
    },
  },

  setup(props) {
    const menu = inject(MenuSymbol);

    const [itemRef, listAttrs, listEvents] = useInteractiveListItem(
      CMenuListKey,
      {
        disabled: props.disabled,
        onSelect: () => menu?.collapse(),
      }
    );

    const [linkTag, linkAttrs] = useLink();

    return {
      config: useComponentConfig('menuLink'),
      menu,
      linkTag,
      linkAttrs,
      listAttrs,
      listEvents,
      itemRef,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'none',
    };

    const linkProps: Record<string, unknown> = {
      ref: 'itemRef',
      ...this.linkAttrs,
      ...this.listAttrs,
      ...this.listEvents,
      ...generateConfigClass(this.config?.class, this.$props),
    };

    let slot;

    /**
     * TODO resolve issue to properly type `this.linkTag` to
     * better handle the `children` parameter of the `h` function
     */
    if (typeof this.linkTag === 'string') {
      slot = this.$slots?.default?.();
    } else {
      slot = this.$slots?.default;
    }

    return h('li', elementProps, h(this.linkTag, linkProps, slot));
  },
});
