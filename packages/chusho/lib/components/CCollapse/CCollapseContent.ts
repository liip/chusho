import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';

import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';

import useComponentConfig from '../../composables/useComponentConfig';

import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';

import { CollapseSymbol } from './CCollapse';

export default defineComponent({
  name: 'CCollapseContent',

  mixins: [componentMixin, transitionMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const collapse = inject(CollapseSymbol);

    return {
      config: useComponentConfig('collapseContent'),
      chusho,
      collapse,
    };
  },

  methods: {
    renderContent() {
      if (!this.collapse) return null;

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
    return renderWithTransition(
      this.renderContent,
      this.transition,
      this.config?.transition
    );
  },
});
