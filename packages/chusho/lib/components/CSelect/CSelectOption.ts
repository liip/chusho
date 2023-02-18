import { defineComponent, h, inject, mergeProps, toRef } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useInteractiveListItem from '../../composables/useInteractiveListItem';
import { UsePopupSymbol } from '../../composables/usePopup';

import { ALL_TYPES, generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CSelectOption',

  mixins: [componentMixin],

  props: {
    /**
     * The value used when this option is selected.
     * @type {any}
     */
    value: {
      type: ALL_TYPES,
      required: true,
    },
    /**
     * Prevent selecting this option while still displaying it.
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
      onSelect: () => {
        popup?.collapse();
      },
    });

    return {
      config: useComponentConfig('selectOption'),
      popup,
      interactiveListItem,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ref: this.interactiveListItem.itemRef,
      ...this.interactiveListItem.attrs,
      ...this.interactiveListItem.events,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        selected: this.interactiveListItem.selected.value,
      }),
    };

    /**
     * @slot If no content is provided, it defaults to a non-breaking space to ensure the element is clickable.
     */
    return h(
      'div',
      mergeProps(this.$attrs, elementProps),
      this.$slots.default?.() ?? ' '
    );
  },
});
