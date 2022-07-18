import {
  ComputedRef,
  InjectionKey,
  VNode,
  computed,
  getCurrentInstance,
  provide,
  ref,
  watch,
  watchPostEffect,
  withDirectives,
} from 'vue';

import clickOutsideDirective from '../directives/clickOutside/clickOutside';

import useActiveElement from './useActiveElement';
import useCachedUid, { UseCachedUid } from './useCachedUid';

export type RenderPopup = (render: () => VNode) => VNode | VNode[] | null;

export type TriggerKey = KeyboardEvent['key'];

export type UsePopupContext = {
  collapse: () => void;
  disabled: ComputedRef<boolean>;
  expand: (key?: TriggerKey) => void;
  expanded: ComputedRef<boolean>;
  renderPopup: RenderPopup;
  triggerKey: ComputedRef<TriggerKey>;
  type: PopupType;
  uid: UseCachedUid;
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
  disabled?: boolean;
  expanded?: boolean;
  type?: PopupType;
};

interface UsePopup
  extends Pick<UsePopupContext, 'expanded' | 'expand' | 'collapse'> {
  attrs: UseCachedUid['cacheAttrs'];
}

export const UsePopupSymbol: InjectionKey<UsePopupContext> = Symbol('UsePopup');

export default function usePopup({
  closeOnClickOutside = true,
  disabled = false,
  expanded = false,
  type = PopupType.menu,
}: UsePopupOptions = {}): UsePopup {
  const activeElement = useActiveElement();
  const isExpanded = ref(expanded);
  const isDisabled = ref(disabled);
  const triggerKey = ref<TriggerKey>('');
  const uid = useCachedUid('chusho-toggle');
  const vm = getCurrentInstance();

  function expand(key?: TriggerKey) {
    activeElement.save();
    isExpanded.value = true;
    triggerKey.value = key ?? '';
  }

  function collapse() {
    activeElement.restore();
    isExpanded.value = false;
    triggerKey.value = '';
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

  watchPostEffect(() => {
    vm?.emit(`popup:update`, { expanded: isExpanded.value });
  });

  watch(
    () => vm?.props?.open,
    (val, oldVal) => {
      if (val !== oldVal && typeof val === 'boolean') {
        isExpanded.value = val;
      }
    }
  );

  watch(
    () => vm?.props?.disabled,
    (val, oldVal) => {
      if (val !== oldVal && typeof val === 'boolean') {
        isDisabled.value = val;
      }
    }
  );

  provide(UsePopupSymbol, {
    collapse,
    disabled: computed(() => isDisabled.value),
    expand,
    expanded: computed(() => isExpanded.value),
    renderPopup,
    triggerKey: computed(() => triggerKey.value),
    type,
    uid,
  });

  return {
    attrs: uid.cacheAttrs,
    collapse,
    expand,
    expanded: computed(() => isExpanded.value),
  };
}
