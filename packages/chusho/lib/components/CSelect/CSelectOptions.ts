import { defineComponent, h, inject, mergeProps, ref } from 'vue';

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
  name: 'CSelectOptions',

  mixins: [componentMixin, transitionMixin],

  setup() {
    const el = ref<HTMLElement | undefined>();
    const popupTarget = usePopupTarget();
    const interactiveList = inject(UseInteractiveListSymbol);

    if (!interactiveList) {
      throw new Error('CSelectOptions must be used inside a CSelect');
    }

    return {
      config: useComponentConfig('selectOptions'),
      el,
      popupTarget,
      interactiveList,
    };
  },

  methods: {
    renderOptions() {
      const elementProps: Record<string, unknown> = {
        ref: 'el',
        ...generateConfigClass(this.config?.class, this.$props),
        ...this.interactiveList.attrs,
        ...this.popupTarget.attrs,
        ...mergeProps(this.popupTarget.events, this.interactiveList.events),
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
