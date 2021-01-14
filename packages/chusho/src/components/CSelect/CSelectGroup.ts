import {
  defineComponent,
  h,
  inject,
  InjectionKey,
  mergeProps,
  provide,
} from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';
import componentMixin from '../mixins/componentMixin';

export const SelectGroupSymbol: InjectionKey<UseSelectGroup> = Symbol(
  'CSelectGroup'
);

export interface UseSelectGroup {
  labelId: string;
}

export default defineComponent({
  name: 'CSelectGroup',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const api: UseSelectGroup = {
      labelId: uuid('chusho-select-group-label'),
    };

    provide(SelectGroupSymbol, api);

    return {
      selectGroup: api,
    };
  },

  render() {
    const selectGroupConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.selectGroup;
    const elementProps: Record<string, unknown> = {
      role: 'group',
      'aria-labelledby': this.selectGroup.labelId,
      ...generateConfigClass(selectGroupConfig?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
