import { Ref, inject, ref, toRef } from 'vue';

import { DollarChusho } from '../types';

/**
 * Get the user config for a given component
 */
export default function useComponentConfig<
  K extends keyof DollarChusho['options']['components']
>(entry: K): Ref<DollarChusho['options']['components'][K] | undefined> {
  const $chusho = inject<DollarChusho | null>('$chusho', null);
  return $chusho ? toRef($chusho.options.components, entry) : ref(undefined);
}
