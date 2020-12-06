import { mount } from '@vue/test-utils';

import useSelected from './useSelected';

describe('useSelected', () => {
  it('initialize with default value', () => {
    const selected = useSelected('1');

    expect(selected.selectedItem.value).toBe('1');
  });

  it('emits when there’s a component instance, a prop name and the value changes', () => {
    const wrapper = mount({
      setup() {
        return {
          selected: useSelected('1', 'selected'),
        };
      },
      mounted() {
        this.selected.setSelectedItem('2');
      },
      template: '<div></div>',
    });

    expect(wrapper.emitted()).toEqual({ 'update:selected': [['2']] });
  });

  it('updates the selectedItem when there’s a component instance and the prop value changes', async () => {
    const wrapper = mount(
      {
        props: ['modelValue'],
        setup(props) {
          return {
            selected: useSelected(props.modelValue, 'modelValue'),
          };
        },
        template: '<div></div>',
      },
      {
        props: {
          modelValue: '1',
        },
      }
    );

    expect(wrapper.vm.selected.selectedItem.value).toEqual('1');
    await wrapper.setProps({ modelValue: '2' });
    expect(wrapper.vm.selected.selectedItem.value).toEqual('2');
  });

  it('setSelectedItem changes selectedItem', () => {
    const selected = useSelected('1');

    selected.setSelectedItem('2');

    expect(selected.selectedItem.value).toBe('2');
  });

  it('addItem adds item to the list of items', () => {
    const selected = useSelected();

    selected.addItem('1');
    selected.addItem('2');
    selected.addItem('3');

    expect(selected.items.value).toEqual(['1', '2', '3']);
  });

  it('removeItem removes item from the list of items', () => {
    const selected = useSelected();

    selected.addItem('1');
    selected.addItem('2');
    selected.addItem('3');

    expect(selected.items.value).toEqual(['1', '2', '3']);

    selected.removeItem('2');
    expect(selected.items.value).toEqual(['1', '3']);

    selected.removeItem('3');
    expect(selected.items.value).toEqual(['1']);

    selected.removeItem('1');
    expect(selected.items.value).toEqual([]);
  });
});
