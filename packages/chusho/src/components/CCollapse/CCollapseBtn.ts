import { inject, defineComponent, h, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import { CBtn } from '../CBtn';
import { CollapseSymbol } from './CCollapse';
import { UseCollapse } from './CCollapse';

export default defineComponent({
  name: 'CCollapseBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const collapse = inject(CollapseSymbol) as UseCollapse;

    return {
      collapse,
    };
  },

  render() {
    const collapseBtnConfig = inject<DollarChusho | null>('$chusho', null)
      ?.options?.components?.collapseBtn;
    const elementProps: Record<string, unknown> = {
      ...this.collapse.toggle.attrs.btn.value,
      ...generateConfigClass(collapseBtnConfig?.class, {
        ...this.$props,
        active: this.collapse.toggle.isOpen.value,
      }),
      bare: collapseBtnConfig?.inheritBtnClass === false,
    };

    return h(
      CBtn,
      mergeProps(this.$attrs, this.$props, elementProps),
      this.$slots.default
    );
  },
});
