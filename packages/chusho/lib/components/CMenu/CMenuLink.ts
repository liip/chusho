import { PropType, defineComponent, h, inject, mergeProps } from 'vue';
import { RouteLocationRaw } from 'vue-router';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem from '../../composables/useInteractiveListItem';
import { UsePopupSymbol } from '../../composables/usePopup';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';

export default defineComponent({
  name: 'CMenuLink',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Prevent selecting this item while still displaying it.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The link to open when this item is selected.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * The route to open when this item is selected.
     */
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: null,
    },
  },

  setup(props) {
    const popup = inject(UsePopupSymbol);

    const interactiveListItem = useInteractiveListItem({
      disabled: props.disabled,
      onSelect: () => popup?.collapse(),
    });

    return {
      config: useComponentConfig('menuLink'),
      interactiveListItem,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'none',
    };

    const linkProps: Record<string, unknown> = {
      ref: this.interactiveListItem.itemRef,
      href: this.href,
      to: this.to,
      ...this.interactiveListItem.attrs,
      ...this.interactiveListItem.events,
      ...generateConfigClass(this.config?.class, this.$props),
      bare: true,
    };

    return h('li', elementProps, [
      h(CBtn, mergeProps(this.$attrs, linkProps), this.$slots),
    ]);
  },
});
