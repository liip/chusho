import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import usePopupBtn from '../../composables/usePopupBtn';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';

export default defineComponent({
  name: 'CMenuBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const popupBtn = usePopupBtn();

    return {
      config: useComponentConfig('menuBtn'),
      popupBtn,
    };
  },

  render() {
    const active = this.popupBtn.popup.expanded.value ?? false;
    const elementProps: Record<string, unknown> = {
      ...this.popupBtn.attrs,
      ...this.popupBtn.events,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        disabled: this.popupBtn.attrs.disabled,
        active,
      }),
      active,
      bare: true,
    };

    return h(CBtn, mergeProps(this.$attrs, this.$props, elementProps), () =>
      this.$slots?.default?.({ active })
    );
  },
});
