import { InjectionKey, defineComponent, h, mergeProps, provide } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid, { UseCachedUid } from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export const SelectGroupSymbol: InjectionKey<SelectGroup> =
  Symbol('CSelectGroup');

export interface SelectGroup {
  labelUid: UseCachedUid;
}

export default defineComponent({
  name: 'CSelectGroup',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const selectGroup: SelectGroup = {
      labelUid: useCachedUid('chusho-select-group-label'),
    };

    provide(SelectGroupSymbol, selectGroup);

    return {
      config: useComponentConfig('selectGroup'),
      selectGroup,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, this.$props),
      ...this.selectGroup.labelUid.cacheAttrs,
      role: 'group',
      'aria-labelledby': this.selectGroup.labelUid.id.value,
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
