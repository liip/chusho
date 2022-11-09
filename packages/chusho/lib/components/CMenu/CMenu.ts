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

export const CMenuKey = Symbol('CMenuKey');

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

  emits: ['popup:update', 'menu-item:click'],

  setup(props) {
    const [attrs, { collapse }] = usePopup(CMenuKey, {
      initialValue: props.open,
      disabled: props.disabled,
      type: PopupType.menu,
    });

    const menu: Menu = {
      disabled: computed(() => props.disabled),
      collapse,
    };

    provide(MenuSymbol, menu);

    return {
      attrs,
      config: useComponentConfig('menu'),
      menu,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...this.attrs,
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
