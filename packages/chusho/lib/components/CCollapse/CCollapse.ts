import { InjectionKey, defineComponent, h, mergeProps, provide } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useTogglable from '../../composables/useTogglable';

import { generateConfigClass } from '../../utils/components';
import uid from '../../utils/uid';

export const CollapseSymbol: InjectionKey<UseCollapse> = Symbol('CCollapse');

export interface UseCollapse {
  uid: string;
  toggle: ReturnType<typeof useTogglable>;
}

export default defineComponent({
  name: 'CCollapse',

  mixins: [componentMixin],

  inheritAttrs: false,

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
    const collapse: UseCollapse = {
      uid: uid('chusho-collapse'),
      toggle: useTogglable(props.modelValue),
    };

    provide(CollapseSymbol, collapse);

    return {
      config: useComponentConfig('collapse'),
      collapse,
    };
  },

  /**
   * @slot
   * @binding {boolean} active `true` when collapse is open
   */
  render() {
    const isActive = this.collapse?.toggle.isOpen.value ?? false;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h(
      'div',
      mergeProps(this.$attrs, elementProps),
      this.$slots?.default?.({ active: isActive }) ?? []
    );
  },
});
