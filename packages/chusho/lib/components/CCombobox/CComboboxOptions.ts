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
  name: 'CComboboxOptions',

  mixins: [componentMixin, transitionMixin],

  setup() {
    const popupTarget = usePopupTarget();
    const interactiveList = inject(UseInteractiveListSymbol);

    if (!interactiveList) {
      throw new Error('CComboboxOptions must be used inside a CCombobox');
    }

    return {
      config: useComponentConfig('comboboxOptions'),
      popupTarget,
      interactiveList,
    };
  },

  methods: {
    renderOptions() {
      const elementProps: Record<string, unknown> = {
        ...generateConfigClass(this.config?.class, this.$props),
        ...this.interactiveList.attrs,
        ...this.popupTarget.attrs,
        ...this.popupTarget.events,
        tabindex: '-1',
      };

      return this.popupTarget.popup.renderPopup(() =>
        h('div', mergeProps(this.$attrs, elementProps), this.$slots)
      );
    },
  },

  render() {
    return renderWithTransition(
      this.renderOptions,
      this.transition,
      this.config?.transition
    );
  },
});
