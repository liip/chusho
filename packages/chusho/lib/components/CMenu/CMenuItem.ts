import { defineComponent, h, inject, mergeProps, toRef } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem, {
  InteractiveListItemRoles,
} from '../../composables/useInteractiveListItem';
import { UsePopupSymbol } from '../../composables/usePopup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CMenuItem',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * The value used when this item is selected.
     * @type {any}
     */
    value: {
      type: ALL_TYPES,
      // `null` is considered an acceptable value
      default: undefined,
    },
    /**
     * Prevent selecting this item while still displaying it.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const popup = inject(UsePopupSymbol);
    const interactiveListItem = useInteractiveListItem({
      value: toRef(props, 'value'),
      disabled: toRef(props, 'disabled'),
      onSelect: ({ role }) => {
        role === InteractiveListItemRoles.menuitem && popup?.collapse();
      },
    });

    return {
      config: useComponentConfig('menuItem'),
      interactiveListItem,
    };
  },

  /**
   * @slot
   * @binding {boolean} selected `true` when the item is selected
   */
  render() {
    const elementProps: Record<string, unknown> = {
      ref: this.interactiveListItem.itemRef,
      ...this.interactiveListItem.attrs,
      ...this.interactiveListItem.events,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        role: this.interactiveListItem.attrs.role,
        selected: this.interactiveListItem.selected.value,
      }),
    };

    return h(
      'li',
      mergeProps(this.$attrs, elementProps),
      this.$slots?.default?.({ selected: this.interactiveListItem.selected })
    );
  },
});
