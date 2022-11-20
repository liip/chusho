import {
  ComputedRef,
  InjectionKey,
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  provide,
} from 'vue';

import componentMixin from '../mixins/componentMixin';

import useCachedUid, { UseCachedUid } from '../../composables/useCachedUid';
import useComponentConfig from '../../composables/useComponentConfig';

import { generateConfigClass } from '../../utils/components';

export const FormGroupSymbol: InjectionKey<FormGroup> = Symbol('CFormGroup');

export type FormGroupFlag = ComputedRef<boolean | undefined>;

export interface FormGroup {
  required: FormGroupFlag;
  disabled: FormGroupFlag;
  readonly: FormGroupFlag;
  uid: UseCachedUid;
  ids: Record<string, string>;
}

export default defineComponent({
  name: 'CFormGroup',

  mixins: [componentMixin],

  props: {
    /**
     * Specify an HTML element to render. If you defined a default value in the config, you can set it to `false` to render only its children (renderless).
     * @type {string|false}
     */
    as: {
      type: [String, Boolean],
      default: null,
    },
    /**
     * Flag the group as required. Automatically sets the attribute of the same name on any child CTextField, CTextarea, CRadio & CCheckbox.
     */
    required: {
      type: Boolean,
      default: undefined,
    },
    /**
     * Flag the group as disabled. Automatically sets the attribute of the same name on any child CTextField, CTextarea, CRadio, CCheckbox & CSelect.
     */
    disabled: {
      type: Boolean,
      default: undefined,
    },
    /**
     * Flag the group as readonly. Automatically sets the attribute of the same name on any child CTextField & CTextarea.
     */
    readonly: {
      type: Boolean,
      default: undefined,
    },
  },

  setup(props) {
    const parentFormGroup = inject(FormGroupSymbol, undefined);
    const uid = useCachedUid();
    const ids: FormGroup['ids'] = new Proxy(
      {},
      {
        get: function (target, prop) {
          return `chusho-${String(prop)}-${uid.id.value}`;
        },
      }
    );

    const formGroup: FormGroup = {
      required: computed(
        () => props.required ?? parentFormGroup?.required.value
      ),
      disabled: computed(
        () => props.disabled ?? parentFormGroup?.disabled.value
      ),
      readonly: computed(
        () => props.readonly ?? parentFormGroup?.readonly.value
      ),
      uid,
      ids,
    };

    provide(FormGroupSymbol, formGroup);

    return {
      config: useComponentConfig('formGroup'),
      formGroup,
    };
  },

  /**
   * @slot
   * @binding {boolean} required The `required` prop value
   * @binding {boolean} disabled The `disabled` prop value
   * @binding {boolean} readonly The `readonly` prop value
   * @binding {object} ids Dynamically generate an id based on the key used, for example: `ids.field` will return `chusho-field-{form group id}`. The same key will always return the same id. The label default id is `ids.label` and the field default id is `ids.field`.
   */
  render() {
    const flags = {
      required: this.formGroup.required.value,
      disabled: this.formGroup.disabled.value,
      readonly: this.formGroup.readonly.value,
    };
    const elementProps: Record<string, unknown> = {
      ...generateConfigClass(this.config?.class, {
        ...this.$props,
        ...flags,
      }),
      ...this.formGroup.uid.cacheAttrs,
    };
    const as = this.as ?? this.config?.as;
    const children = this.$slots?.default?.({
      ...flags,
      ids: this.formGroup.ids,
    });

    return typeof as === 'string'
      ? h(as, mergeProps(this.$attrs, elementProps), children)
      : children;
  },
});
