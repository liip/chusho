import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { UseInteractiveListSymbol } from '../../composables/useInteractiveList';
import usePopupTarget from '../../composables/usePopupTarget';

import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';

export default defineComponent({
  name: 'CMenuList',

  mixins: [componentMixin, transitionMixin],

  setup() {
    const popupTarget = usePopupTarget();
    const popup = popupTarget.popup;
    const interactiveList = inject(UseInteractiveListSymbol);

    if (!interactiveList) {
      throw new Error('CMenuList must be used inside a CMenu');
    }

    return {
      config: useComponentConfig('menuList'),
      popupTarget,
      popup,
      interactiveList,
    };
  },

  methods: {
    renderDropdown() {
      const elementProps: Record<string, unknown> = {
        ...generateConfigClass(this.config?.class, this.$props),
        ...this.interactiveList.attrs,
        ...this.popupTarget.attrs,
        ...mergeProps(this.popupTarget.events, this.interactiveList.events),
      };

      return this.popup.renderPopup(() =>
        h('ul', mergeProps(this.$attrs, elementProps), this.$slots)
      );
    },
  },

  render() {
    return renderWithTransition(
      this.renderDropdown,
      this.transition,
      this.config?.transition
    );
  },
});
