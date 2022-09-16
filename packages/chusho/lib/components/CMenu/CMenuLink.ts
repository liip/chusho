import { PropType, defineComponent, h, inject } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem from '../../composables/useInteractiveListItem';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';
import { MenuSymbol } from './CMenu';

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

    const {
      itemRef,
      attrs: listItemAttrs,
      events: listItemEvents,
    } = useInteractiveListItem({
      disabled: props.disabled,
      onSelect: () => menu?.collapse(),
    });

    return {
      config: useComponentConfig('menuLink'),
      menu,
      listItemAttrs,
      listItemEvents,
      itemRef,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'none',
    };

    const linkProps: Record<string, unknown> = {
      ref: 'itemRef',
      href: this.href,
      to: this.to,
      ...this.listItemAttrs,
      ...this.listItemEvents,
      ...generateConfigClass(this.config?.class, this.$props),
      bare: true,
    };

    // FIXME: There’s currently no way to customize/add local attributes on the link element.
    return h('li', elementProps, [h(CBtn, linkProps, this.$slots)]);
  },
});
