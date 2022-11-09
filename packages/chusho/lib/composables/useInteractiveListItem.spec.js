import { mount, shallowMount } from '@vue/test-utils';
import { computed, h, nextTick, ref, toRef } from 'vue';

import uid from '../utils/uid';

import {
  InteractiveListRoles,
  UseInteractiveListSymbol,
} from './useInteractiveList';
import useInteractiveListItem, {
  InteractiveListItemRoles,
} from './useInteractiveListItem';

vi.mock('../utils/uid');
uid.mockImplementation(() => 0);

const itemProps = { id: 0, disabled: false, text: 'adipisicing' };

const registerItem = vi.fn();
const unregisterItem = vi.fn();
const updateItem = vi.fn();
const onSelect = vi.fn();

/**
 * Dumb toggle implementation since we don't need to work with
 * actual multiple selection in our tests
 */
const toggleItem = vi.fn((value) =>
  selected.value === value ? (selected.value = null) : (selected.value = value)
);

const selected = ref(null);

const defaultProvide = {
  role: InteractiveListRoles.list,
  multiple: false,
  selection: computed(() => selected.value),
  activeItem: ref(null),
  registerItem,
  unregisterItem,
  updateItem,
  toggleItem,
};

const TestItem = {
  name: 'ListItemTest',

  props: {
    id: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { itemRef, attrs, events } = useInteractiveListItem({
      value: toRef(props, 'value'),
      disabled: toRef(props, 'disabled'),
      onSelect,
    });

    return {
      attrs,
      events,
      itemRef,
    };
  },

  render() {
    return h(
      'div',
      {
        ref: 'itemRef',
        ...this.attrs,
        ...this.events,
      },
      this.$props.text
    );
  },
};

let wrapper;

beforeEach(() => {
  toggleItem(null);
  toggleItem.mockClear();
  onSelect.mockClear();
  registerItem.mockClear();
  unregisterItem.mockClear();
  updateItem.mockClear();
});

describe('item lifecycle', () => {
  it('self register on mount and unregister on unmount', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'something',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: defaultProvide,
        },
      },
    });

    expect(registerItem).toBeCalledTimes(1);
    expect(registerItem).toHaveBeenCalledWith(0, {
      disabled: false,
      value: expect.objectContaining({ value: 'something' }),
    });

    expect(updateItem).toBeCalledTimes(1);
    expect(updateItem).toHaveBeenCalledWith(0, { text: 'adipisicing' });

    wrapper.unmount();

    expect(unregisterItem).toHaveBeenCalledWith(0);
  });
});

describe('role attribute', () => {
  it('is `listitem` when list is of type `list`', () => {
    wrapper = mount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: defaultProvide,
        },
      },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListItemRoles.listitem
    );
  });

  it('is `option` when list is of type `listbox` and a value is provided', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'lorem',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListItemRoles.option
    );
  });

  it('warn when list is of type `listbox` but no value is provided', () => {
    wrapper = shallowMount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
          },
        },
      },
    });

    expect(
      'ListItemTest: useInteractiveList of type “listbox” requires “useInteractiveListItem” to provide a “value” option, so that items can be selected.'
    ).toHaveBeenWarned();
  });

  it('is `option` when list is of type `combobox` and a value is provided', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'lorem',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListItemRoles.option
    );
  });

  it('warn when list is of type `combobox` but no value is provided', () => {
    wrapper = shallowMount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
          },
        },
      },
    });

    expect(
      'ListItemTest: useInteractiveList of type “combobox” requires “useInteractiveListItem” to provide a “value” option, so that items can be selected.'
    ).toHaveBeenWarned();
  });

  it('is `menuitem` when list is of type `menu`', () => {
    wrapper = mount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListItemRoles.menuitem
    );
  });

  it('is `menuitemradio` when list is of type `menu` and a value is available', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'lorem',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListItemRoles.menuitemradio
    );
  });

  it('is `menuitemcheckbox` when list is of type `menu`, a value is available and `multiple` is true', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'lorem',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListItemRoles.menuitemcheckbox
    );
  });
});

describe('aria-disabled attribute', () => {
  it('is `undefined` when item is not disabled', () => {
    wrapper = mount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: defaultProvide,
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-disabled', undefined);
  });

  it('is `true` when item is disabled', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: defaultProvide,
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-disabled', 'true');
  });

  it('changes when disabled option changes', async () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: false,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: defaultProvide,
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-disabled', undefined);
    await wrapper.setProps({ disabled: true });
    await nextTick();
    expect(wrapper.vm).toHaveProperty('attrs.aria-disabled', 'true');
  });
});

describe('tabindex attribute', () => {
  it('is `-1` when the item is not active', () => {
    wrapper = mount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.tabindex', '-1');
  });

  it('is `0` when the item is active', () => {
    wrapper = mount(TestItem, {
      props: itemProps,
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
            activeItem: ref(itemProps.id),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.tabindex', '0');
  });
});

describe('aria-checked/aria-selected attributes', () => {
  it('is `true` for item of type `menuitemradio` if selected', () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
            selection: ref(value),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-checked', 'true');
  });

  it('is `false` for item of type `menuitemradio` if not selected', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'lorem',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-checked', 'false');
  });

  it('is `true` for item of type `menuitemcheckbox` if selected', () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
            selection: ref(value),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-checked', 'true');
  });

  it('is `false` for item of type `menuitemcheckbox` if not selected', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value: 'lorem',
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-checked', 'false');
  });

  it('is `true` for item of type `option` if selected', () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: true,
            selection: ref(value),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'true');

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: false,
            selection: ref(value),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'true');

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: true,
            selection: ref(value),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'true');

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: true,
            selection: ref(value),
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'true');
  });

  it('is `false` for item of type `option` if not selected', () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: true,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'false');

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: false,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'false');

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: true,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'false');

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: true,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-selected', 'false');
  });

  it('is `undefined` for items not selectable', () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-checked', undefined);

    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.list,
          },
        },
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.aria-checked', undefined);
  });
});

describe('event emission and callback', () => {
  it('emit `onSelect` without parameters and call `onSelect` when type is `listitem` and not disabled', async () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.list,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    const changeEvents = wrapper.emitted('select');

    expect(changeEvents).toHaveLength(3);
    expect(changeEvents[0]).toEqual([]);
    expect(changeEvents[1]).toEqual([]);
    expect(changeEvents[2]).toEqual([]);

    expect(onSelect).toBeCalledTimes(3);
    expect(onSelect).toHaveBeenCalledWith({
      role: InteractiveListItemRoles.listitem,
    });

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.list,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents).toHaveLength(3);
    expect(onSelect).toBeCalledTimes(3);
  });

  it('emit `onSelect` without parameters when type is `menuitem` and not disabled', async () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    const changeEvents = wrapper.emitted('select');

    expect(changeEvents).toHaveLength(3);
    expect(changeEvents[0]).toEqual([]);
    expect(changeEvents[1]).toEqual([]);
    expect(changeEvents[2]).toEqual([]);

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents).toHaveLength(3);
  });

  it('emit `onSelect` with parameters when type is `menuitemradio` and element is not selected and not disabled', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');

    const changeEvents = wrapper.emitted('select');

    expect(changeEvents[0]).toHaveProperty('0.checked', 'true');
    expect(changeEvents[0]).toHaveProperty('0.value', value);

    toggleItem(null);

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(changeEvents[1]).toHaveProperty('0.checked', 'true');
    expect(changeEvents[1]).toHaveProperty('0.value', value);

    toggleItem(null);

    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents[2]).toHaveProperty('0.checked', 'true');
    expect(changeEvents[2]).toHaveProperty('0.value', value);

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents).toHaveLength(3);
  });

  it('emit `onSelect` with parameters when type is `menuitemcheckbox` and not disabled', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    await wrapper.trigger('click');

    const changeEvents = wrapper.emitted('select');

    expect(changeEvents[0]).toHaveProperty('0.checked', 'true');
    expect(changeEvents[0]).toHaveProperty('0.value', value);

    await wrapper.trigger('click');

    expect(changeEvents[1]).toHaveProperty('0.checked', 'false');
    expect(changeEvents[1]).toHaveProperty('0.value', value);

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(changeEvents[2]).toHaveProperty('0.checked', 'true');
    expect(changeEvents[2]).toHaveProperty('0.value', value);

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(changeEvents[3]).toHaveProperty('0.checked', 'false');
    expect(changeEvents[3]).toHaveProperty('0.value', value);

    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents[4]).toHaveProperty('0.checked', 'true');
    expect(changeEvents[4]).toHaveProperty('0.value', value);

    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents[5]).toHaveProperty('0.checked', 'false');
    expect(changeEvents[5]).toHaveProperty('0.value', value);

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(changeEvents).toHaveLength(6);
  });

  it('does not emit `onSelect` event when type is `menuitemradio` and element is already selected', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
            selection: ref(value),
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    const changeEvents = wrapper.emitted('select');

    expect(changeEvents).toBe(undefined);
  });
});

describe('item selection', () => {
  it('select `menuitemradio` item when not selected and not disabled', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();

    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).not.toBeCalled();
  });

  it('select `option` item when not selected and not disabled', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();

    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();
    wrapper.unmount();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    toggleItem(null);
    toggleItem.mockClear();

    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenCalledWith(value);

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).not.toBeCalled();

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: false,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).not.toBeCalled();
  });

  it('toggle `menuitemcheckbox` when not disabled', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    await wrapper.trigger('click');

    expect(toggleItem).toBeCalledTimes(1);
    expect(toggleItem).toHaveBeenNthCalledWith(1, value);
    expect(wrapper.vm.attrs).toHaveProperty('aria-checked', 'true');

    await wrapper.trigger('click');

    expect(toggleItem).toBeCalledTimes(2);
    expect(toggleItem).toHaveBeenNthCalledWith(2, value);
    expect(wrapper.vm.attrs).toHaveProperty('aria-checked', 'false');

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(toggleItem).toBeCalledTimes(3);
    expect(toggleItem).toHaveBeenNthCalledWith(3, value);
    expect(wrapper.vm.attrs).toHaveProperty('aria-checked', 'true');

    await wrapper.trigger('keydown', { key: 'Enter' });

    expect(toggleItem).toBeCalledTimes(4);
    expect(toggleItem).toHaveBeenNthCalledWith(4, value);
    expect(wrapper.vm.attrs).toHaveProperty('aria-checked', 'false');

    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(5);
    expect(toggleItem).toHaveBeenNthCalledWith(5, value);
    expect(wrapper.vm.attrs).toHaveProperty('aria-checked', 'true');

    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(6);
    expect(toggleItem).toHaveBeenNthCalledWith(6, value);
    expect(wrapper.vm.attrs).toHaveProperty('aria-checked', 'false');

    wrapper.unmount();
    toggleItem(null);
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        disabled: true,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: true,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).not.toBeCalled();
  });

  it('ignore item when type is `listitem`', async () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.list,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(0);
  });

  it('ignore item when type is `menuitem`', async () => {
    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(0);
  });

  it('ignore item when type is `menuitemradio` and item is selected', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.menu,
            multiple: false,
            selection: ref(value),
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(0);
  });

  it('ignore item when type is `option` and item is selected', async () => {
    const value = 'lorem';

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.listbox,
            multiple: false,
            selection: ref(value),
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(0);

    wrapper.unmount();
    toggleItem.mockClear();

    wrapper = mount(TestItem, {
      props: {
        ...itemProps,
        value,
      },
      global: {
        provide: {
          [UseInteractiveListSymbol]: {
            ...defaultProvide,
            role: InteractiveListRoles.combobox,
            multiple: false,
            selection: ref(value),
          },
        },
      },
    });

    await wrapper.trigger('click');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(toggleItem).toBeCalledTimes(0);
  });
});
