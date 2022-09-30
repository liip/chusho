import { Transition, TransitionProps, VNode, h } from 'vue';

import {
  ClassGenerator,
  ClassGeneratorCommonCtx,
  VueClassBinding,
} from '../types';

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

export function generateConfigClass<T extends ClassGeneratorCommonCtx>(
  configClass: VueClassBinding | ClassGenerator<T> | null = null,
  ctx: T = {} as T
): Record<string, unknown> {
  if (configClass && !ctx.bare) {
    return {
      class: typeof configClass === 'function' ? configClass(ctx) : configClass,
    };
  }
  return {};
}

export function renderWithTransition(
  render: () => VNode | VNode[] | null,
  vmTransition?: TransitionProps | false,
  configTransition?: TransitionProps
): VNode | VNode[] | null {
  let props: TransitionProps | null = null;

  if (isPlainObject(vmTransition)) {
    props = vmTransition;
  } else if (vmTransition !== false && isPlainObject(configTransition)) {
    props = configTransition;
  }

  return props ? h(Transition, props, render) : render();
}
