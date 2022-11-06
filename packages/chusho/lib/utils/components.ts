import {
  ComponentPublicInstance,
  PropType,
  Transition,
  TransitionProps,
  VNode,
  h,
  unref,
} from 'vue';

import {
  ClassGenerator,
  ClassGeneratorCommonCtx,
  VueClassBinding,
} from '../types';
import { MaybeRef } from '../types/utils';

import { isPlainObject } from '../utils/objects';

export const ALL_TYPES = [
  String,
  Number,
  Boolean,
  Array,
  Object,
  Date,
  Symbol,
] as PropType<
  | string
  | number
  | boolean
  | unknown[]
  | Record<string, unknown>
  | Date
  | symbol
  | null
>;

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

export function getElement<
  T extends HTMLElement | SVGElement | ComponentPublicInstance | null
>(
  el: MaybeRef<T>
): T extends ComponentPublicInstance ? Exclude<T, ComponentPublicInstance> : T {
  const plain = unref(el);
  return (plain as ComponentPublicInstance)?.$el || plain;
}
