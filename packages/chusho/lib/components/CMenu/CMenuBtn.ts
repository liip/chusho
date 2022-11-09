import { defineComponent, h, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import useTogglableBtn from '../../composables/usePopupBtn';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';
import { CMenuKey } from './CMenu';

export default defineComponent({
  name: 'CMenuBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const [attrs, events, { expanded }] = useTogglableBtn(CMenuKey);

    return {
      config: useComponentConfig('menuBtn'),
      attrs,
      events,
      expanded,
    };
  },

  methods: {},

  render() {
    const elementProps: Record<string, unknown> = {
      ...this.attrs,
      ...this.events,

      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        disabled: this.attrs.disabled,
      }),
      bare: true,
    };

    return h(CBtn, mergeProps(this.$attrs, this.$props, elementProps), () =>
      this.$slots?.default?.({ active: this.expanded })
    );
  },
});
