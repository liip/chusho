import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';

import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import usePopupTarget from '../../composables/usePopupTarget';

import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';

export default defineComponent({
  name: 'CCollapseContent',

  mixins: [componentMixin, transitionMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const popupTarget = usePopupTarget();
    const popup = popupTarget.popup;

    return {
      config: useComponentConfig('collapseContent'),
      chusho,
      popupTarget,
      popup,
    };
  },

  methods: {
    renderContent() {
      const elementProps: Record<string, unknown> = {
        ...this.popupTarget.attrs,
        ...generateConfigClass(
          this.chusho?.options?.components?.collapseContent?.class,
          this.$props
        ),
      };

      return this.popup.renderPopup(() =>
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
