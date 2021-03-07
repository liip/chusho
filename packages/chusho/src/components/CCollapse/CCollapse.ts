import {
  provide,
  InjectionKey,
  defineComponent,
  h,
  inject,
  mergeProps,
} from 'vue';
import useToggle from '../../composables/useToggle';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../mixins/componentMixin';

export const CollapseSymbol: InjectionKey<UseCollapse> = Symbol('CCollapse');

export interface UseCollapse {
  uuid: string;
  toggle: ReturnType<typeof useToggle>;
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
    const api: UseCollapse = {
      uuid: uuid('chusho-collapse'),
      toggle: useToggle(props.modelValue),
    };

    provide(CollapseSymbol, api);

    return {
      collapse: api,
    };
  },

  /**
   * @slot
   * @binding {boolean} active `true` when collapse is open
   */
  render() {
    const collapseConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.collapse;
    const isActive = this.collapse?.toggle.isOpen.value ?? false;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(collapseConfig?.class, {
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
