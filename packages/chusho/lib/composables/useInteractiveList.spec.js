import { mount } from '@vue/test-utils';
import { h, reactive } from 'vue';

import useInteractiveList, { InteractiveListRoles } from './useInteractiveList';

const fixture = [
  { id: 0, data: { disabled: false, text: 'adipisicing' } },
  { id: 1, data: { disabled: false, text: 'lorem cupidatat' } },
  { id: 2, data: { disabled: true, text: 'disabled item' } },
  { id: 3, data: { disabled: false, text: 'ipsum dolor' } },
];

let wrapper;
let items;

const TestList = {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    initialValue: {
      type: [Array, Number],
      default: [],
    },
    role: {
      type: String,
      default: InteractiveListRoles.list,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    skipDisabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { attrs, events, ...context } = useInteractiveList({
      multiple: props.multiple,
      initialValue: props.initialValue,
      role: props.role,
      loop: props.loop,
      skipDisabled: props.skipDisabled,
    });

    return { attrs, events, context: reactive(context) };
  },

  render() {
    return h('div', { ...this.attrs, ...this.events });
  },
};

describe('General properties', () => {
  it('return the provided role as spreadable attributes', () => {
    wrapper = mount(TestList, {
      props: {
        role: InteractiveListRoles.menu,
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.role', InteractiveListRoles.menu);

    wrapper.unmount();

    wrapper = mount(TestList, {
      props: {
        role: InteractiveListRoles.list,
      },
    });

    expect(wrapper.vm).toHaveProperty('attrs.role', InteractiveListRoles.list);

    wrapper.unmount();

    wrapper = mount(TestList, {
      props: { role: InteractiveListRoles.listbox },
    });

    expect(wrapper.vm).toHaveProperty(
      'attrs.role',
      InteractiveListRoles.listbox
    );
  });

  it('return event handlers as spreadable attributes', () => {
    wrapper = mount(TestList);

    expect(wrapper.vm).toHaveProperty('events.onKeydown');
  });
});

describe('Item manipulation', () => {
  beforeEach(() => {
    wrapper = mount(TestList);

    expect(wrapper.vm.context.items).toHaveLength(0);

    wrapper.vm.context.registerItem(fixture[0].id, fixture[0].data);

    expect(wrapper.vm.context.items).toHaveLength(1);
    expect(wrapper.vm.context.items).toEqual([
      { id: fixture[0].id, ...fixture[0].data },
    ]);
  });

  describe('item registration', () => {
    it('register an new item by id', () => {
      wrapper.vm.context.registerItem(fixture[1].id, fixture[1].data);

      expect(wrapper.vm.context.items).toHaveLength(2);
      expect(wrapper.vm.context.items).toEqual([
        { id: fixture[0].id, ...fixture[0].data },
        { id: fixture[1].id, ...fixture[1].data },
      ]);
    });

    it('doesn’t register the same item twice', () => {
      wrapper.vm.context.registerItem(fixture[1].id, fixture[1].data);
      wrapper.vm.context.registerItem(fixture[1].id, fixture[1].data);

      expect(wrapper.vm.context.items).toHaveLength(2);
      expect(wrapper.vm.context.items).toEqual([
        { id: fixture[0].id, ...fixture[0].data },
        { id: fixture[1].id, ...fixture[1].data },
      ]);
      expect(
        'useInteractiveList: item with id “1” is already registered.'
      ).toHaveBeenWarned();
    });

    it('unregister existing item by ids', () => {
      let deleted = wrapper.vm.context.unregisterItem(fixture[1].id);

      expect(deleted).toBe(false);
      expect(wrapper.vm.context.items).toHaveLength(1);

      deleted = wrapper.vm.context.unregisterItem(fixture[0].id, items);

      expect(deleted).toBe(true);
      expect(wrapper.vm.context.items).toHaveLength(0);
    });

    it('update an existing item by shallow merging new data', () => {
      wrapper.vm.context.updateItem(fixture[0].id, { disabled: true });

      expect(wrapper.vm.context.items).toHaveLength(1);
      expect(wrapper.vm.context.items).toEqual([
        { id: fixture[0].id, ...fixture[0].data, disabled: true },
      ]);
    });

    it('doesn’t update an inexisting item', () => {
      wrapper.vm.context.updateItem(fixture[1].id, { disabled: true });

      expect(wrapper.vm.context.items).toHaveLength(1);
      expect(wrapper.vm.context.items).toEqual([
        { id: fixture[0].id, ...fixture[0].data, disabled: false },
      ]);
      expect(
        'useInteractiveList: tried to update item “1” with {"disabled":true} but no such item exists.'
      ).toHaveBeenWarned();
    });
  });

  describe('Item selection', () => {
    it('set and replace selected item by id', () => {
      wrapper = mount(TestList);

      expect(wrapper.vm.context.selection).toBe(undefined);

      wrapper.vm.context.selectItem(fixture[0].id);

      expect(wrapper.vm.context.selection).toBe(fixture[0].id);

      wrapper.vm.context.selectItem(fixture[1].id);

      expect(wrapper.vm.context.selection).toBe(fixture[1].id);
    });

    it('build up a list of selected items when required', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: true,
        },
      });

      expect(wrapper.vm.context.selection).toHaveLength(0);

      wrapper.vm.context.selectItem(fixture[0].id);

      expect(wrapper.vm.context.selection).toHaveLength(1);
      expect(wrapper.vm.context.selection).toEqual([fixture[0].id]);

      wrapper.vm.context.selectItem(fixture[1].id);

      expect(wrapper.vm.context.selection).toHaveLength(2);
      expect(wrapper.vm.context.selection).toEqual([
        fixture[0].id,
        fixture[1].id,
      ]);
    });

    it('deselect an item by id', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: true,
          initialValue: [fixture[0].id, fixture[1].id],
        },
      });

      expect(wrapper.vm.context.selection).toHaveLength(2);

      let deselected = wrapper.vm.context.deselectItem(fixture[0].id);

      expect(deselected).toBe(true);
      expect(wrapper.vm.context.selection).toEqual([fixture[1].id]);

      deselected = wrapper.vm.context.deselectItem(fixture[0].id);

      expect(deselected).toBe(false);
      expect(wrapper.vm.context.selection).toHaveLength(1);

      deselected = wrapper.vm.context.deselectItem(fixture[1].id);

      expect(deselected).toBe(true);
      expect(wrapper.vm.context.selection).toHaveLength(0);
    });

    it('toggle and replace selected item by id', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: false,
          initialValue: fixture[0].id,
        },
      });

      expect(wrapper.vm.context.selection).toBe(fixture[0].id);

      wrapper.vm.context.toggleItem(fixture[0].id);

      expect(wrapper.vm.context.selection).toBe(undefined);

      wrapper.vm.context.toggleItem(fixture[0].id);

      expect(wrapper.vm.context.selection).toBe(fixture[0].id);

      wrapper.vm.context.toggleItem(fixture[1].id);

      expect(wrapper.vm.context.selection).toBe(fixture[1].id);
    });

    it('toggle and build up a list of selected items when required', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: true,
          initialValue: fixture[0].id,
        },
      });

      expect(wrapper.vm.context.selection).toEqual([fixture[0].id]);

      wrapper.vm.context.toggleItem(fixture[0].id);

      expect(wrapper.vm.context.selection).toHaveLength(0);

      wrapper.vm.context.toggleItem(fixture[0].id);
      wrapper.vm.context.toggleItem(fixture[1].id);

      expect(wrapper.vm.context.selection).toHaveLength(2);

      expect(wrapper.vm.context.selection).toEqual([
        fixture[0].id,
        fixture[1].id,
      ]);
    });

    it('reset selected items with initial value', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: true,
          initialValue: fixture[0].id,
        },
      });

      expect(wrapper.vm.context.selection).toHaveLength(1);
      expect(wrapper.vm.context.selection).toEqual([fixture[0].id]);

      wrapper.vm.context.selectItem(fixture[1].id);

      expect(wrapper.vm.context.selection).toHaveLength(2);
      expect(wrapper.vm.context.selection).toEqual([
        fixture[0].id,
        fixture[1].id,
      ]);

      wrapper.vm.context.resetSelection();

      expect(wrapper.vm.context.selection).toHaveLength(1);
      expect(wrapper.vm.context.selection).toEqual([fixture[0].id]);
    });

    it('clear selected item on single selection', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: false,
          initialValue: fixture[0].id,
        },
      });

      expect(wrapper.vm.context.selection).toBe(fixture[0].id);

      wrapper.vm.context.clearSelection();

      expect(wrapper.vm.context.selection).toBe(undefined);
    });

    it('clear selected items on multiple selection', () => {
      wrapper = mount(TestList, {
        props: {
          multiple: true,
          initialValue: [fixture[0].id, fixture[1].id],
        },
      });

      expect(wrapper.vm.context.selection).toEqual([
        fixture[0].id,
        fixture[1].id,
      ]);

      wrapper.vm.context.clearSelection();

      expect(wrapper.vm.context.selection).toEqual([]);
    });

    it('emit event on single selection change', async () => {
      wrapper = mount(TestList);

      expect(wrapper.vm.context.selection).toBe(undefined);

      await wrapper.vm.context.selectItem(fixture[0].id);

      const changeEvent = wrapper.emitted('update:modelValue');

      expect(changeEvent).toHaveLength(1);
      expect(changeEvent[0]).toEqual([fixture[0].id]);

      await wrapper.vm.context.selectItem(fixture[1].id);

      expect(changeEvent).toHaveLength(2);
      expect(changeEvent[1]).toEqual([fixture[1].id]);

      await wrapper.vm.context.deselectItem(fixture[1].id);

      expect(changeEvent).toHaveLength(3);
      expect(changeEvent[2]).toEqual([undefined]);
    });

    it('emit event on multiple selection change', async () => {
      wrapper = mount(TestList, {
        props: {
          multiple: true,
        },
      });

      expect(wrapper.vm.context.selection).toEqual([]);

      await wrapper.vm.context.selectItem(fixture[0].id);

      const changeEvent = wrapper.emitted('update:modelValue');

      expect(changeEvent).toHaveLength(1);
      expect(changeEvent[0]).toEqual([[fixture[0].id]]);

      await wrapper.vm.context.selectItem(fixture[1].id);

      expect(changeEvent).toHaveLength(2);
      expect(changeEvent[1]).toEqual([[fixture[0].id, fixture[1].id]]);

      await wrapper.vm.context.deselectItem(fixture[0].id);

      expect(changeEvent).toHaveLength(3);
      expect(changeEvent[2]).toEqual([[fixture[1].id]]);
    });
  });

  describe('Item activation', () => {
    it('clear the active item', () => {
      wrapper.vm.context.activateItemAt(0);
      expect(wrapper.vm.context.activeItem).toBe(0);
      wrapper.vm.context.clearActiveItem();

      expect(wrapper.vm.context.activeItem).toBe(null);
    });

    it('skips disabled items when ordered to', async () => {
      wrapper = mount(TestList, {
        props: {
          skipDisabled: true,
        },
      });
      fixture.forEach(({ id, data }) =>
        wrapper.vm.context.registerItem(id, data)
      );

      await wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(wrapper.vm.context.activeItem).toBe(0);
      await wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(wrapper.vm.context.activeItem).toBe(1);
      await wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(wrapper.vm.context.activeItem).toBe(3);
    });

    describe('without loop', () => {
      beforeEach(() => {
        wrapper = mount(TestList, {
          props: {
            loop: false,
          },
        });
        fixture.forEach(({ id, data }) =>
          wrapper.vm.context.registerItem(id, data)
        );
      });

      it('activate an item by it’s positive index number until end', async () => {
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(0);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(1);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(2);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(3);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(3);
      });

      it('activate an item by it’s negative index number until end', async () => {
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(3);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(2);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(1);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(0);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(0);
      });
    });

    describe('with loop', () => {
      beforeEach(() => {
        wrapper = mount(TestList, {
          props: {
            loop: true,
          },
        });
        fixture.forEach(({ id, data }) =>
          wrapper.vm.context.registerItem(id, data)
        );
      });

      it('activate an item by it’s positive index number and start over at the end', async () => {
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(0);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(1);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(2);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(3);
        await wrapper.trigger('keydown', { key: 'ArrowDown' });
        expect(wrapper.vm.context.activeItem).toBe(0);
      });

      it('activate an item by it’s negative index number and start over at the end', async () => {
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(3);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(2);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(1);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(0);
        await wrapper.trigger('keydown', { key: 'ArrowUp' });
        expect(wrapper.vm.context.activeItem).toBe(3);
      });
    });
  });
});
