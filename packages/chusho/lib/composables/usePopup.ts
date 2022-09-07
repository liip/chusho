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

export type TriggerKey = KeyboardEvent['key'] | null;

export type UsePopup = {
  collapse: () => void;
  expand: (key?: TriggerKey) => void;
  toggle: () => void;
  renderPopup: RenderPopup;
  disabled: Readonly<Ref<boolean>>;
  expanded: Readonly<Ref<boolean>>;
  triggerKey: Readonly<Ref<TriggerKey>>;
  type: PopupType;
  uid: UseCachedUid;
  attrs: UseCachedUid['cacheAttrs'];
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
  type = PopupType.menu,
}: UsePopupOptions = {}): UsePopup {
  const activeElement = useActiveElement();
  const isExpanded = ref(expanded);
  const isDisabled = ref(disabled);
  const triggerKey = ref<TriggerKey>(null);
  const uid = useCachedUid('chusho-popup');
  const vm = getCurrentInstance();

  function setIsExpanded(val: boolean) {
    isExpanded.value = val;
    vm?.emit(`update:${expandedPropName}`, val);
  }

  function expand(key: TriggerKey = null) {
    activeElement.save();
    triggerKey.value = key;
    setIsExpanded(true);
  }

  function collapse() {
    activeElement.restore();
    triggerKey.value = null;
    setIsExpanded(false);
  }

  function toggle() {
    isExpanded.value ? collapse() : expand();
  }

  const renderPopup: RenderPopup = (render) => {
    if (!isExpanded.value) {
      return null;
    }

    if (closeOnClickOutside) {
      return withDirectives(render(), [
        [clickOutsideDirective, () => collapse()],
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
    triggerKey: readonly(triggerKey),
    collapse,
    expand,
    toggle,
    renderPopup,
  };

  provide<UsePopup>(UsePopupSymbol, popup);

  return popup;
}
