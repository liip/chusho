import {
  inject,
  h,
  defineComponent,
  PropType,
  BaseTransitionProps,
  Transition,
  mergeProps,
} from 'vue';

import { DollarChusho } from '../../types';
import { isPlainObject } from '../../utils/objects';
import { generateConfigClass } from '../../utils/components';
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
        id: this.collapse.uuid,
        ...generateConfigClass(
          this.chusho?.options?.components?.collapseContent?.class,
          this.$props
        ),
      };

      if (this.collapse.open.value) {
        return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
      }

      return null;
    },
  },

  render() {
    const collapseConfig = this.chusho?.options?.components?.collapseContent;
    let transitionProps: BaseTransitionProps | null = null;

    if (isPlainObject(this.transition)) {
      transitionProps = this.transition;
    } else if (this.transition !== false && collapseConfig?.transition) {
      transitionProps = collapseConfig.transition;
    }

    return transitionProps
      ? h(Transition, transitionProps, this.renderContent)
      : this.renderContent();
  },
});
