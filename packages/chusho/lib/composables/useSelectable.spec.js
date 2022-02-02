import { mount } from '@vue/test-utils';

import useSelectable from './useSelectable';

describe('useSelectable', () => {
  it('initialize with default value', () => {
    const selectable = useSelectable('1');

    expect(selectable.selectedItemId.value).toBe('1');
  });

  it('emits when there’s a component instance, a prop name and the value changes', () => {
    const wrapper = mount({
      emits: ['update:selectable'],
      setup() {
        return {
          selectable: useSelectable('1', 'selectable'),
        };
      },
      mounted() {
        this.selectable.setSelectedItem('2');
      },
      template: '<div></div>',
    });

    expect(wrapper.emitted()).toEqual({ 'update:selectable': [['2']] });
  });

  it('updates the selectedItem when there’s a component instance and the prop value changes', async () => {
    const wrapper = mount(
      {
        props: ['modelValue'],
        setup(props) {
          return {
            selectable: useSelectable(props.modelValue, 'modelValue'),
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

    expect(wrapper.vm.selectable.selectedItemId.value).toEqual('1');
    await wrapper.setProps({ modelValue: '2' });
    expect(wrapper.vm.selectable.selectedItemId.value).toEqual('2');
    // It should do nothing if the value didn’t actually change
    await wrapper.setProps({ modelValue: '2' });
    expect(wrapper.vm.selectable.selectedItemId.value).toEqual('2');
  });

  it('setSelectedItem changes selectedItem', () => {
    const selectable = useSelectable('1');

    selectable.setSelectedItem('2');

    expect(selectable.selectedItemId.value).toBe('2');
  });

  it('addItem adds item to the list of items', () => {
    const selectable = useSelectable();

    selectable.addItem('1');
    selectable.addItem('2');
    selectable.addItem('3');

    expect(selectable.items.value).toMatchSnapshot();
  });

  it('removeItem removes item from the list of items', () => {
    const selectable = useSelectable();

    selectable.addItem('1');
    selectable.addItem('2');
    selectable.addItem('3');

    expect(selectable.items.value).toMatchSnapshot();

    selectable.removeItem('2');
    expect(selectable.items.value).toMatchSnapshot();

    selectable.removeItem('3');
    expect(selectable.items.value).toMatchSnapshot();

    selectable.removeItem('1');
    expect(selectable.items.value).toMatchSnapshot();
  });

  it('provides the selected item, its ID and index', () => {
    const selectable = useSelectable('1');

    selectable.addItem('1');

    expect(selectable.selectedItem.value).toEqual({ id: '1' });
    expect(selectable.selectedItemId.value).toBe('1');
    expect(selectable.selectedItemIndex.value).toBe(0);
  });
});
