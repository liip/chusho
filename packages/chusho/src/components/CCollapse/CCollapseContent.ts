import { inject, h, defineComponent, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';
import { CollapseSymbol } from './CCollapse';
import { UseCollapse } from './CCollapse';

export default defineComponent({
  name: 'CCollapseContent',

  mixins: [componentMixin, transitionMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const collapse = inject(CollapseSymbol) as UseCollapse;

    return {
      chusho,
      collapse,
    };
  },

  methods: {
    renderContent() {
      const elementProps: Record<string, unknown> = {
        ...this.collapse.toggle.attrs.target.value,
        ...generateConfigClass(
          this.chusho?.options?.components?.collapseContent?.class,
          this.$props
        ),
      };

      return this.collapse.toggle.renderIfOpen(() =>
        h('div', mergeProps(this.$attrs, elementProps), this.$slots)
      );
    },
  },

  render() {
    const collapseConfig = this.chusho?.options?.components?.collapseContent;

    return renderWithTransition(
      this.renderContent,
      this.transition,
      collapseConfig?.transition
    );
  },
});
