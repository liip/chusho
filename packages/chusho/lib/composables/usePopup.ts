import {
  InjectionKey,
  Ref,
  VNode,
  getCurrentInstance,
  provide,
  readonly,
  ref,
  watch,
  withDirectives,
} from 'vue';

import { MaybeRef } from '../types/utils';

import clickOutsideDirective from '../directives/clickOutside/clickOutside';

import useActiveElement from './useActiveElement';
import useCachedUid, { UseCachedUid } from './useCachedUid';

export type RenderPopup = (render: () => VNode) => VNode | VNode[] | null;

export type Trigger = KeyboardEvent['key'] | 'Click' | null;

export type UsePopup = {
  collapse: (options?: { restoreFocus: boolean }) => void;
  expand: (key?: Trigger) => void;
  toggle: (key?: Trigger) => void;
  renderPopup: RenderPopup;
  disabled: Readonly<Ref<boolean>>;
  expanded: Readonly<Ref<boolean>>;
  trigger: Readonly<Ref<Trigger>>;
  type?: PopupType;
  uid: UseCachedUid;
  attrs: UseCachedUid['cacheAttrs'];
  btnRef: Ref<HTMLElement | null>;
};

export enum PopupType {
  dialog = 'dialog',
  grid = 'grid',
  listbox = 'listbox',
  menu = 'menu',
  tree = 'tree',
}

export type UsePopupOptions = {
  closeOnClickOutside?: boolean;
  disabled?: MaybeRef<boolean>;
  disabledPropName?: string | null;
  expanded?: MaybeRef<boolean>;
  expandedPropName?: string | null;
  type?: PopupType;
};

export const UsePopupSymbol: InjectionKey<UsePopup> = Symbol('UsePopup');

export default function usePopup({
  closeOnClickOutside = true,
  disabled = false,
  disabledPropName = null,
  expanded = false,
  expandedPropName = null,
  type = undefined,
}: UsePopupOptions = {}): UsePopup {
  const activeElement = useActiveElement();
  const isExpanded = ref(expanded);
  const isDisabled = ref(disabled);
  const trigger = ref<Trigger>(null);
  const uid = useCachedUid('chusho-popup');
  const btnRef = ref<HTMLElement | null>(null);
  const vm = getCurrentInstance();

  function setIsExpanded(val: boolean) {
    isExpanded.value = val;

    if (expandedPropName) {
      vm?.emit(`update:${expandedPropName}`, val);
    }
  }

  function expand(key: Trigger = null) {
    activeElement.save();
    trigger.value = key;
    setIsExpanded(true);
  }

  function collapse({ restoreFocus = true } = {}) {
    if (restoreFocus) {
      activeElement.restore();
    }
    trigger.value = null;
    setIsExpanded(false);
  }

  function toggle(key: Trigger = null) {
    isExpanded.value ? collapse() : expand(key);
  }

  const renderPopup: RenderPopup = (render) => {
    if (!isExpanded.value) {
      return null;
    }

    if (closeOnClickOutside) {
      return withDirectives(render(), [
        [
          clickOutsideDirective,
          {
            handler: () => collapse({ restoreFocus: false }),
            options: {
              ignore: [btnRef],
            },
          },
        ],
      ]);
    }

    return render();
  };

  if (expandedPropName) {
    watch(
      () => vm?.props?.[expandedPropName],
      (val, oldVal) => {
        if (val !== oldVal && typeof val === 'boolean') {
          isExpanded.value = val;
        }
      }
    );
  }

  if (disabledPropName) {
    watch(
      () => vm?.props?.[disabledPropName],
      (val, oldVal) => {
        if (val !== oldVal && typeof val === 'boolean') {
          isDisabled.value = val;
        }
      }
    );
  }

  const popup: UsePopup = {
    uid,
    type,
    attrs: uid.cacheAttrs,
    disabled: readonly(isDisabled),
    expanded: readonly(isExpanded),
    trigger: readonly(trigger),
    collapse,
    expand,
    toggle,
    renderPopup,
    btnRef,
  };

  provide<UsePopup>(UsePopupSymbol, popup);

  return popup;
}
