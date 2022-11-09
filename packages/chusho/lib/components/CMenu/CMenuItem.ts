import { defineComponent, h, inject, toRef } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem, {
  InteractiveListItemRoles,
} from '../../composables/useInteractiveListItem';

import { generateConfigClass } from '../../utils/components';

import { MenuSymbol } from './CMenu';
import { CMenuListKey } from './CMenuList';

export default defineComponent({
  name: 'CMenuItem',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const menu = inject(MenuSymbol);

    const [itemRef, attrs, events, { selected }] = useInteractiveListItem(
      CMenuListKey,
      {
        value: toRef(props, 'value'),
        disabled: toRef(props, 'disabled'),
        onSelect: ({ role }) => {
          role === InteractiveListItemRoles.menuitem && menu?.collapse();
        },
      }
    );

    return {
      config: useComponentConfig('menuItem'),
      menu,
      attrs,
      events,
      itemRef,
      selected,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ref: 'itemRef',
      ...this.attrs,
      ...this.events,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        role: this.attrs.role,
        selected: this.selected,
      }),
    };

    return h(
      'li',
      elementProps,
      this.$slots?.default?.({ selected: this.selected })
    );
  },
});
