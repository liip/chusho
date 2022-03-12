import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';
import { FormGroupSymbol } from '../CFormGroup/CFormGroup';
import { SelectSymbol } from './CSelect';

export default defineComponent({
  name: 'CSelectBtn',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    return {
      config: useComponentConfig('selectBtn'),
      formGroup: inject(FormGroupSymbol, null),
      select: inject(SelectSymbol),
      uid: useCachedUid('chusho-select-btn'),
    };
  },

  render() {
    const open = this.select?.togglable.isOpen.value;
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        active: open,
        disabled: this.select?.disabled.value,
      }),
      ...this.select?.togglable.attrs.btn.value,
      ...this.uid.cacheAttrs,
      'aria-haspopup': 'listbox',
      disabled: this.select?.disabled.value,
      bare: true,
    };

    if (this.formGroup) {
      // Combine the form group label and the select btn (self) content as label for the select
      const id = this.$attrs.id ?? this.uid.id.value;
      const labels =
        [this.$attrs['aria-labelledby'], this.formGroup?.ids.label, id]
          .filter((s) => !!s)
          .join(' ') || undefined;

      elementProps.id = id;
      elementProps['aria-labelledby'] = labels;
    }

    return h(CBtn, mergeProps(this.$attrs, this.$props, elementProps), () =>
      this.$slots?.default?.({ open })
    );
  },
});
