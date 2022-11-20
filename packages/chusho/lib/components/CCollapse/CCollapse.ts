import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import usePopup from '../../composables/usePopup';

import { generateConfigClass } from '../../utils/components';

export default defineComponent({
  name: 'CCollapse',

  mixins: [componentMixin],

  props: {
    /**
     * Optionally bind the Collapse state with the parent component.
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    const popup = usePopup({
      closeOnClickOutside: false,
      expanded: props.modelValue,
      expandedPropName: 'modelValue',
    });

    return {
      config: useComponentConfig('collapse'),
      popup,
    };
  },

  /**
   * @slot
   * @binding {boolean} active `true` when collapse is open
   */
  render() {
    const isActive = this.popup?.expanded.value;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: isActive,
      }),
      ...this.popup.attrs,
    };

    return h(
      'div',
      mergeProps(this.$attrs, elementProps),
      this.$slots?.default?.({ active: isActive })
    );
  },
});
