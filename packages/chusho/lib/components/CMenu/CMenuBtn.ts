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
    const { attrs: popupBtnAttrs, events, expanded } = usePopupBtn();

    return {
      config: useComponentConfig('menuBtn'),
      popupBtnAttrs,
      events,
      expanded,
    };
  },

  methods: {},

  render() {
    const elementProps: Record<string, unknown> = {
      ...this.popupBtnAttrs,
      ...this.events,

      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        disabled: this.popupBtnAttrs.disabled,
        active: this.expanded,
      }),
      active: this.expanded,
      bare: true,
    };

    return h(CBtn, mergeProps(this.$attrs, this.$props, elementProps), () =>
      this.$slots?.default?.({ active: this.expanded })
    );
  },
});
