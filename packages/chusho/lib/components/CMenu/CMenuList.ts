import { defineComponent, h, inject, mergeProps, watchEffect } from 'vue';

import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveList, {
  InteractiveListRoles,
} from '../../composables/useInteractiveList';
import usePopupTarget from '../../composables/usePopupTarget';

import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';

import { MenuSymbol } from './CMenu';

export const CMenuListKey = Symbol('CMenuListKey');

export default defineComponent({
  name: 'CMenuList',

  mixins: [componentMixin, transitionMixin],

  inheritAttrs: false,

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const menu = inject(MenuSymbol);

    const {
      attrs: togglableAttrs,
      events: togglableEvents,
      popup,
    } = usePopupTarget();

    const [listAttrs, listEvents, { activateItemAt, clearActiveItem }] =
      useInteractiveList(CMenuListKey, {
        role: InteractiveListRoles.menu,
        loop: true,
        multiple: props.multiple,
      });

    watchEffect(() => {
      switch (popup.triggerKey.value) {
        case 'ArrowUp':
          activateItemAt(-1);
          break;
        case 'ArrowDown':
          activateItemAt(0);
          break;
        default:
          clearActiveItem();
          break;
      }
    });

    return {
      config: useComponentConfig('menuList'),
      togglableAttrs,
      listAttrs,
      togglableEvents,
      listEvents,
      menu,
      renderPopup: popup.renderPopup,
    };
  },

  methods: {
    renderDropdown() {
      if (!this.menu) return null;

      const dropDownProps: Record<string, unknown> = {
        ...this.listAttrs,
        ...this.togglableAttrs,
        ...mergeProps(this.togglableEvents, this.listEvents),
        ...generateConfigClass(this.config?.class, this.$props),
      };

      return this.renderPopup(() =>
        h('ul', mergeProps(this.$attrs, dropDownProps), this.$slots)
      );
    },
  },

  render() {
    return renderWithTransition(
      this.renderDropdown,
      this.transition,
      this.config?.transition
    );
  },
});
