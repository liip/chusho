import { Ref, inject, reactive, toRef } from 'vue';

import { isNil } from '../utils/objects';

import { FormGroupSymbol } from '../components/CFormGroup/CFormGroup';

interface flags {
  required?: Ref<boolean>;
  disabled?: Ref<boolean>;
  readonly?: Ref<boolean>;
}

type flag = keyof flags;

/**
 * Allow a child of CFormGroup to access its context
 */
export default function useFormGroup(
  props: Record<string, unknown>,
  flagsToSet: Array<flag>
) {
  const formGroup = inject(FormGroupSymbol, null);
  const flags: flags = {};

  flagsToSet.forEach((flagToSet) => {
    flags[flagToSet] = !isNil(props[flagToSet])
      ? (toRef(props, flagToSet) as flags[flag])
      : formGroup?.[flagToSet];
  });

  return {
    formGroup,
    flags: reactive(flags),
  };
}
