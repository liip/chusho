import { BaseTransitionProps, Transition, VNode, h } from 'vue';

import { ClassGenerator, VueClassBinding } from '../types';

import { isPlainObject } from '../utils/objects';

export const ALL_TYPES = [
  String,
  Number,
  Boolean,
  Array,
  Object,
  Date,
  Function,
  Symbol,
];

export function generateConfigClass(
  configClass?: VueClassBinding | ClassGenerator,
  ctx?: Record<string, unknown>
): Record<string, unknown> {
  if (configClass && !ctx?.bare) {
    return {
      class: typeof configClass === 'function' ? configClass(ctx) : configClass,
    };
  }
  return {};
}

export function renderWithTransition(
  render: () => VNode | VNode[] | null,
  vmTransition?: BaseTransitionProps | false,
  configTransition?: BaseTransitionProps
): VNode | VNode[] | null {
  let props: BaseTransitionProps | null = null;

  if (isPlainObject(vmTransition)) {
    props = vmTransition;
  } else if (vmTransition !== false && isPlainObject(configTransition)) {
    props = configTransition;
  }

  return props ? h(Transition, props, render) : render();
}
