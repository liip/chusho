import {
  ComponentPublicInstance,
  PropType,
  Transition,
  TransitionProps,
  VNode,
  h,
  normalizeClass,
  unref,
} from 'vue';

import { ClassGenerator, VueClassBinding } from '../types';
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

export type RawVariant =
  | string
  | Record<string, unknown>
  | Array<Record<string, unknown> | string>;

export type ToNormalizedVariant<T> = Omit<T, 'variant'> & {
  variant?: Record<string, boolean>;
};

export interface ClassGeneratorCommonCtx {
  variant?: RawVariant;
  bare?: boolean;
}

export function generateConfigClass<T extends ClassGeneratorCommonCtx>(
  configClass:
    | VueClassBinding
    | ClassGenerator<ToNormalizedVariant<T>>
    | null = null,
  ctx: T = {} as T
): Record<string, unknown> {
  const obj: { class?: VueClassBinding } = {};

  if (configClass && !ctx.bare) {
    if (typeof configClass === 'function') {
      const configClassCtx: ToNormalizedVariant<T> = Object.assign({}, ctx, {
        variant: undefined,
      });

      /**
       * Normalize the variant prop into an object of booleans.
       */
      if (ctx.variant) {
        const normalizedVariants = normalizeClass(ctx.variant)
          .split(' ')
          .reduce((acc, v) => {
            acc[v] = true;
            return acc;
          }, {} as Record<string, boolean>);

        configClassCtx.variant = new Proxy(normalizedVariants, {
          get: (target, prop: string): boolean => {
            return target[prop] || false;
          },
        });
      }

      obj.class = configClass(configClassCtx);
    } else {
      obj.class = configClass;
    }
  }

  return obj;
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
