import { defineComponent, h, inject, mergeProps } from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';
import { UsePopupSymbol } from '../../composables/usePopup';
import usePopupBtn from '../../composables/usePopupBtn';

import { generateConfigClass } from '../../utils/components';

import { CBtn } from '../CBtn';
import { FormGroupSymbol } from '../CFormGroup';

export default defineComponent({
  name: 'CComboboxBtn',

  mixins: [componentMixin],

  setup() {
    const popup = inject(UsePopupSymbol);

    return {
      config: useComponentConfig('comboboxBtn'),
      formGroup: inject(FormGroupSymbol, null),
      uid: useCachedUid('chusho-combobox-btn'),
      popupBtn: usePopupBtn(),
      popup,
    };
  },

  render() {
    const elementProps: Record<string, unknown> = {
      ...this.popupBtn.attrs,
      ...this.popupBtn.events,
      ...this.uid.cacheAttrs,
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        disabled: this.popupBtn?.popup.disabled.value,
        active: this.popupBtn?.popup.expanded.value,
      }),
      tabindex: '-1',
      bare: true,
    };

    if (this.formGroup) {
      // Combine the form group label and the combobox btn (self) content as label for the select
      const id = this.$attrs.id ?? this.uid.id.value;
      const labels = [
        this.$attrs['aria-labelledby'],
        this.formGroup?.ids.label,
        id,
      ]
        .filter((s) => !!s)
        .join(' ');

      elementProps.id = id;
      elementProps['aria-labelledby'] = labels;
    }

    return h(
      h(CBtn, mergeProps(this.$attrs, this.$props, elementProps), this.$slots),
      // There’s already a ref from cachedUid
      { ref: this.popup?.btnRef }
    );
  },
});
