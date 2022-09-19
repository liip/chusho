import {
  ComponentPublicInstance,
  Ref,
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  unref,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue';

import { MaybeRef } from '../types/utils';

import { warn } from '../utils/debug';
import uid from '../utils/uid';

import {
  InteractiveListRoles,
  UseInteractiveListSymbol,
} from './useInteractiveList';

export enum InteractiveListItemRoles {
  menuitem = 'menuitem',
  menuitemcheckbox = 'menuitemcheckbox',
  menuitemradio = 'menuitemradio',
  option = 'option',
  listitem = 'listitem',
}

interface UseInteractiveListItemOptions {
  disabled: MaybeRef<boolean>;
  value?: Ref<string>;
  onSelect?: ({ role }: { role: InteractiveListItemRoles }) => void;
}

interface UseInteractiveListItem {
  itemRef: Ref<HTMLElement | ComponentPublicInstance | undefined>;
  attrs: {
    value?: Ref<string>;
    role: InteractiveListItemRoles;
    tabindex: '0' | '-1';
    'aria-disabled'?: 'true';
  };
  events: {
    onClick: (e: MouseEvent) => void;
    onKeydown: (e: KeyboardEvent) => void;
  };
  selected: Ref<boolean>;
}

export default function useInteractiveListItem({
  value,
  disabled,
  onSelect,
}: UseInteractiveListItemOptions): UseInteractiveListItem {
  const interactiveList = inject(UseInteractiveListSymbol);

  if (!interactiveList) {
    throw new Error(
      `useInteractiveListItem must be used within useInteractiveList`
    );
  }

  const {
    multiple,
    registerItem,
    unregisterItem,
    updateItem,
    activeItem,
    toggleItem,
    selection,
    role: listRole,
  } = interactiveList;

  const id = uid('chusho-interactive-list-item');
  const isActive = ref(false);
  const itemRef = ref<HTMLElement | ComponentPublicInstance>();
  const vm = getCurrentInstance();

  registerItem(id, { disabled: unref(disabled) });

  onMounted(() => {
    if (vm?.proxy) {
      updateItem(id, { text: vm.proxy.$el.textContent.toLowerCase().trim() });
    }
  });

  watch(
    () => unref(disabled),
    () => {
      updateItem(id, { disabled: unref(disabled) });
    }
  );

  watchEffect(() => {
    if (activeItem.value === id) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  });

  watchPostEffect(() => {
    if (isActive.value && itemElement.value) {
      itemElement.value.focus();
    }
  });

  onBeforeUnmount(() => {
    unregisterItem(id);
  });

  const itemRole = computed(() => {
    if (listRole === InteractiveListRoles.menu) {
      if (value?.value) {
        return multiple
          ? InteractiveListItemRoles.menuitemcheckbox
          : InteractiveListItemRoles.menuitemradio;
      }

      return InteractiveListItemRoles.menuitem;
    } else if (
      listRole === InteractiveListRoles.listbox ||
      listRole === InteractiveListRoles.combobox
    ) {
      if (!value?.value) {
        warn(
          `${vm?.type.name}: useInteractiveList of type “${listRole}” requires “useInteractiveListItem” to provide a “value” option, so that items can be selected.`
        );
      }
      return InteractiveListItemRoles.option;
    }

    return InteractiveListItemRoles.listitem;
  });

  const isSelectable = computed(() => {
    return [
      InteractiveListItemRoles.menuitemcheckbox,
      InteractiveListItemRoles.menuitemradio,
      InteractiveListItemRoles.option,
    ].includes(itemRole.value);
  });

  const isTogglable = computed(() => {
    return itemRole.value === InteractiveListItemRoles.menuitemcheckbox;
  });

  const selected = computed(() => {
    if (!isSelectable.value || !value?.value) {
      return false;
    }

    if (Array.isArray(selection.value)) {
      return selection.value.includes(value.value);
    }

    return selection.value === value.value;
  });

  const itemElement = computed(() => {
    if (itemRef?.value instanceof HTMLElement) {
      return itemRef?.value;
    } else if (itemRef?.value?.$el) {
      return itemRef?.value?.$el;
    }

    return null;
  });

  const checked = computed(() =>
    isSelectable.value ? (selected.value ? 'true' : 'false') : undefined
  );

  function handleAction(e: Event) {
    if (unref(disabled)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (!isSelectable.value) {
      vm?.emit('select');
    } else if ((!selected.value || isTogglable.value) && value?.value) {
      /**
       * trigger if
       *   (not selected or (selected and togglable))
       * and
       *   has a value defined
       */
      toggleItem(value.value);
      vm?.emit('select', { checked: checked.value, value: value?.value });
    }

    onSelect?.({ role: itemRole.value });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();

      handleAction(e);
    }
  }

  return {
    itemRef,
    attrs: reactive({
      id,
      role: itemRole,
      tabindex: computed(() => (isActive.value ? '0' : '-1')),
      'aria-disabled': computed(() => (unref(disabled) ? 'true' : undefined)),
      'aria-checked': checked,
    }),
    events: {
      onClick: handleAction,
      onKeydown: handleKeydown,
    },
    selected,
  };
}
