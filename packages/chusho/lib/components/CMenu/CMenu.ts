import { defineComponent, h, mergeProps, watchEffect } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveList, {
  InteractiveListRoles,
} from '../../composables/useInteractiveList';
import usePopup, { PopupType } from '../../composables/usePopup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CMenu',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Bind the Menu value with the parent component.
     * @type {any}
     */
    modelValue: {
      type: ALL_TYPES,
      default: undefined,
    },
    /**
     * Bind the MenuList opening state with the parent component.
     */
    open: {
      type: Boolean,
      default: false,
    },
    /**
     * Prevent opening the Menu.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Allow to select multiple items within the menu.
     */
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'update:open'],

  setup(props) {
    const popup = usePopup({
      expanded: props.open,
      expandedPropName: 'open',
      disabled: props.disabled,
      disabledPropName: 'disabled',
      type: PopupType.menu,
    });

    const interactiveList = useInteractiveList({
      role: InteractiveListRoles.menu,
      loop: true,
      initialValue: props.modelValue,
      multiple: props.multiple,
    });

    watchEffect(() => {
      switch (popup.trigger.value) {
        case 'ArrowDown':
        case 'Click':
          interactiveList.activateItemAt(0);
          break;
        case 'ArrowUp':
          interactiveList.activateItemAt(-1);
          break;
        default:
          interactiveList.clearActiveItem();
          break;
      }
    });

    return {
      config: useComponentConfig('menu'),
      popup,
    };
  },

  /**
   * @slot
   * @binding {boolean} open `true` when the select is open
   */
  render() {
    const open = this.popup.expanded.value;
    const elementProps: Record<string, unknown> = {
      ...this.popup.attrs,
      ...generateConfigClass(this.config?.class, { ...this.$props, open }),
    };

    return h(
      'div',
      mergeProps(this.$attrs, elementProps),
      this.$slots?.default?.({ open })
    );
  },
});
