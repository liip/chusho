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
  disabled: Ref<boolean> | boolean;
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

  const id = uid('chusho-menu-item');

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

  const isActive = ref(false);
  const itemRef = ref<HTMLElement | ComponentPublicInstance>();
  const vm = getCurrentInstance();

  let isDisabled = unref(disabled);

  registerItem(id, { disabled: isDisabled });

  onMounted(() => {
    if (vm?.proxy) {
      updateItem(id, { text: vm.proxy.$el.textContent.toLowerCase().trim() });
    }
  });

  watch(
    () => unref(disabled),
    () => {
      isDisabled = unref(disabled);
      updateItem(id, { disabled: isDisabled });
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
          `${vm?.type.name}: you are creating a "${listRole}" element but didn’t pass a "value" prop`
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
    if (!isSelectable.value) {
      return false;
    }

    return (
      !!value?.value &&
      (Array.isArray(selection.value)
        ? selection.value.includes(value.value)
        : selection.value === value.value)
    );
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
    if (isDisabled) {
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
      'aria-disabled': computed(() => (isDisabled ? 'true' : undefined)),
      'aria-checked': checked,
    }),
    events: {
      onClick: handleAction,
      onKeydown: handleKeydown,
    },
    selected: computed(() => isSelectable.value && selected.value),
  };
}
