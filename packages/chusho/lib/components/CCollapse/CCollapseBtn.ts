import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import usePopupBtn from '../../composables/usePopupBtn';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';

export default defineComponent({
  name: 'CCollapseBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const popupBtn = usePopupBtn();

    return {
      config: useComponentConfig('collapseBtn'),
      popupBtn,
    };
  },

  render() {
    const active = this.popupBtn?.popup.expanded.value ?? false;
    const elementProps: Record<string, unknown> = {
      ref: this.popupBtn.ref,
      ...this.popupBtn.attrs,
      onClick: this.popupBtn.events.onClick,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active,
      }),
      bare: true,
      active,
    };

    return h(
      CBtn,
      mergeProps(this.$attrs, this.$props, elementProps),
      this.$slots.default
    );
  },
});
