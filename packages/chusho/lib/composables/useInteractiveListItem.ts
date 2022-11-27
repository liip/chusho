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
  toRaw,
  unref,
  watch,
} from 'vue';

import { MaybeRef } from '../types/utils';

import { warn } from '../utils/debug';
import uid from '../utils/uid';

import {
  InteractiveItemData,
  InteractiveItemId,
  InteractiveListRoles,
  UseInteractiveListSymbol,
} from './useInteractiveList';

export enum InteractiveListItemRoles {
  menuitem = 'menuitem',
  menuitemcheckbox = 'menuitemcheckbox',
  menuitemradio = 'menuitemradio',
  option = 'option',
  listitem = 'listitem',
  tab = 'tab',
}

interface UseInteractiveListItemOptions {
  id?: InteractiveItemId;
  disabled?: MaybeRef<boolean>;
  value?: Ref<unknown>;
  onSelect?: ({ role }: { role: InteractiveListItemRoles }) => void;
}

export interface UseInteractiveListItem {
  id: InteractiveItemId;
  itemRef: Ref<HTMLElement | ComponentPublicInstance | undefined>;
  attrs: {
    role: InteractiveListItemRoles;
    tabindex: '0' | '-1';
    'aria-disabled'?: 'true';
    'aria-checked'?: 'true' | 'false';
  };
  events: {
    onClick: (e: MouseEvent) => void;
    onKeydown: (e: KeyboardEvent) => void;
  };
  active: Ref<boolean>;
  selected: Ref<boolean>;
}

export default function useInteractiveListItem({
  id = uid('chusho-interactive-list-item'),
  value,
  disabled = ref(false),
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
    autoSelect,
    registerItem,
    unregisterItem,
    updateItem,
    activateItem,
    activeItem,
    toggleItem,
    selection,
    role: listRole,
  } = interactiveList;

  const isActive = computed(() => activeItem.value === id);
  const itemRef = ref<HTMLElement | ComponentPublicInstance>();
  const vm = getCurrentInstance();

  const itemData: InteractiveItemData = {
    disabled: unref(disabled),
  };

  if (value?.value !== undefined) {
    itemData.value = value;
  }

  registerItem(id, itemData);

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

  watch(
    isActive,
    () => {
      if (isActive.value) {
        itemElement.value?.focus();
      }
    },
    { flush: 'post' }
  );

  onBeforeUnmount(() => {
    unregisterItem(id);
  });

  const itemRole = computed(() => {
    if (listRole === InteractiveListRoles.tablist) {
      return InteractiveListItemRoles.tab;
    } else if (listRole === InteractiveListRoles.menu) {
      if (value?.value !== undefined) {
        return multiple
          ? InteractiveListItemRoles.menuitemcheckbox
          : InteractiveListItemRoles.menuitemradio;
      }

      return InteractiveListItemRoles.menuitem;
    } else if (
      listRole === InteractiveListRoles.listbox ||
      listRole === InteractiveListRoles.combobox
    ) {
      if (value?.value === undefined) {
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
      InteractiveListItemRoles.tab,
    ].includes(itemRole.value);
  });

  const isTogglable = computed(() => {
    return itemRole.value === InteractiveListItemRoles.menuitemcheckbox;
  });

  const selected = computed(() => {
    if (!isSelectable.value || value?.value === undefined) {
      return false;
    }

    if (Array.isArray(selection.value)) {
      return selection.value
        .map((item) => toRaw(item))
        .includes(toRaw(value.value));
    }

    return toRaw(selection.value) === toRaw(value.value);
  });

  if (autoSelect) {
    watch(
      selected,
      () => {
        if (selected.value) {
          activateItem(id);
        }
      },
      {
        immediate: true,
      }
    );
  }

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
    } else if (
      (!selected.value || isTogglable.value) &&
      value?.value !== undefined
    ) {
      /**
       * trigger if
       *   (not selected or (selected and togglable))
       * and
       *   has a value defined
       */
      toggleItem(value.value);
      vm?.emit('select', { selected: checked.value, value: value?.value });
    }

    onSelect?.({ role: itemRole.value });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (['Enter', 'Spacebar', ' '].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();

      handleAction(e);
    }
  }

  const interactiveListItem: UseInteractiveListItem = {
    id,
    itemRef,
    attrs: reactive({
      id,
      role: itemRole,
      tabindex: computed(() => (isActive.value ? '0' : '-1')),
      'aria-disabled': computed(() => (unref(disabled) ? 'true' : undefined)),
      [[InteractiveListItemRoles.option, InteractiveListItemRoles.tab].includes(
        itemRole.value
      )
        ? 'aria-selected'
        : 'aria-checked']: checked,
    }),
    events: {
      onClick: handleAction,
      onKeydown: handleKeydown,
    },
    active: isActive,
    selected,
  };

  return interactiveListItem;
}
