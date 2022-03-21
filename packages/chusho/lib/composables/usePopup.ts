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

import useActiveElement from '../composables/useActiveElement';

import clickOutsideDirective from '../directives/clickOutside/clickOutside';

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
  clickOutside?: boolean;
  disabled?: boolean;
  initialValue?: boolean;
  type?: PopupType;
};

type UsePopup = [
  UseCachedUid['cacheAttrs'],
  Pick<UsePopupContext, 'expanded' | 'expand' | 'collapse'>
];

export default function usePopup(
  UsePopupKey: InjectionKey<UsePopupContext>,
  {
    clickOutside = true,
    disabled = false,
    initialValue = false,
    type = PopupType.menu,
  }: UsePopupOptions = {}
): UsePopup {
  const activeElement = useActiveElement();
  const expanded = ref(initialValue);
  const isDisabled = ref(disabled);
  const triggerKey = ref<TriggerKey>('');
  const uid = useCachedUid('chusho-toggle');
  const vm = getCurrentInstance();

  function expand(key?: TriggerKey) {
    activeElement.save();
    expanded.value = true;
    triggerKey.value = key ?? '';
  }

  function collapse() {
    activeElement.restore();
    expanded.value = false;
    triggerKey.value = '';
  }

  const renderPopup: RenderPopup = (render) => {
    if (!expanded.value) {
      return null;
    }

    if (clickOutside) {
      return withDirectives(render(), [
        [clickOutsideDirective, () => collapse()],
      ]);
    }

    return render();
  };

  watchPostEffect(() => {
    vm?.emit(`popup:update`, { expanded: expanded.value });
  });

  watch(
    () => vm?.props?.open,
    (val, oldVal) => {
      if (val !== oldVal && typeof val === 'boolean') {
        expanded.value = val;
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

  provide(UsePopupKey, {
    collapse,
    disabled: computed(() => isDisabled.value),
    expand,
    expanded: computed(() => expanded.value),
    renderPopup,
    triggerKey: computed(() => triggerKey.value),
    type,
    uid,
  });

  return [
    uid.cacheAttrs,
    {
      collapse,
      expand,
      expanded: computed(() => expanded.value),
    },
  ];
}
