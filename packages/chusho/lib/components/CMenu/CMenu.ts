import {
  ComputedRef,
  InjectionKey,
  computed,
  defineComponent,
  h,
  mergeProps,
  provide,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import usePopup, { PopupType } from '../../composables/usePopup';
import { SelectedItem } from '../../composables/useSelectable';

import { generateConfigClass } from '../../utils/components';

export const MenuSymbol: InjectionKey<Menu> = Symbol('CMenu');

export interface MenuItemData {
  disabled: boolean;
  text: string;
}

export type MenuItem = SelectedItem<MenuItemData>;

export interface Menu {
  disabled: ComputedRef<boolean>;
  collapse: () => void;
}

export default defineComponent({
  name: 'CMenu',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:open', 'menu-item:click'],

  setup(props) {
    const {
      attrs: popupAttrs,
      collapse,
      expanded,
    } = usePopup({
      expanded: props.open,
      expandedPropName: 'open',
      disabled: props.disabled,
      disabledPropName: 'disabled',
      type: PopupType.menu,
    });

    const menu: Menu = {
      disabled: computed(() => props.disabled),
      collapse,
    };

    provide(MenuSymbol, menu);

    return {
      config: useComponentConfig('menu'),
      popupAttrs,
      expanded,
      menu,
    };
  },

  render() {
    const isActive = this.expanded ?? false;
    const elementProps: Record<string, unknown> = {
      ...this.popupAttrs,
      ...generateConfigClass(this.config?.class, { ...this.$props, isActive }),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
