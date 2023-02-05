import { computed, inject, reactive } from 'vue';

import { isNil } from '../utils/objects';

import {
  FormGroupFlag,
  FormGroupSymbol,
} from '../components/CFormGroup/CFormGroup';

interface flags {
  required?: FormGroupFlag;
  disabled?: FormGroupFlag;
  readonly?: FormGroupFlag;
}

type flag = keyof flags;

/**
 * Allow a child of CFormGroup to access its context
 */
export default function useFormGroup(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  flagsToSet: Array<flag>
) {
  const formGroup = inject(FormGroupSymbol, null);
  const flags: flags = {};

  flagsToSet.forEach((flagToSet) => {
    if (isNil(props[flagToSet]) && formGroup) {
      flags[flagToSet] = formGroup[flagToSet];
    } else {
      flags[flagToSet] = computed(() => props[flagToSet]);
    }
  });

  return {
    formGroup,
    flags: reactive(flags),
  };
}
