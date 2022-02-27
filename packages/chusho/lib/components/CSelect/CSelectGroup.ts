import { InjectionKey, defineComponent, h, mergeProps, provide } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';
import uuid from '../../utils/uuid';

export const SelectGroupSymbol: InjectionKey<UseSelectGroup> =
  Symbol('CSelectGroup');

export interface UseSelectGroup {
  labelId: string;
}

export default defineComponent({
  name: 'CSelectGroup',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const selectGroup: UseSelectGroup = {
      labelId: uuid('chusho-select-group-label'),
    };

    provide(SelectGroupSymbol, selectGroup);

    return {
      config: useComponentConfig('selectGroup'),
      selectGroup,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'group',
      'aria-labelledby': this.selectGroup.labelId,
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
