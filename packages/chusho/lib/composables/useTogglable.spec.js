import { mount } from '@vue/test-utils';

import { withSetup } from '../../jest/utils';

import useTogglable from './useTogglable';

describe('useTogglable', () => {
  it('initialize with default value', () => {
    const toggle = withSetup(() => useTogglable(true));

    expect(toggle.isOpen.value).toBe(true);
  });

  it('has a unique ID', () => {
    const toggle = withSetup(() => useTogglable());

    expect(toggle.uid.id.value).toBe('chusho-toggle-0');
  });

  it('emits when there’s a component instance and the value change using default prop name', () => {
    const wrapper = mount({
      emits: ['update:modelValue'],
      setup() {
        return {
          toggle: useTogglable(),
        };
      },
      mounted() {
        this.toggle.open();
      },
      template: '<div></div>',
    });

    expect(wrapper.emitted()).toEqual({ 'update:modelValue': [[true]] });
  });

  it('emits when there’s a component instance and the value change using custom prop name', () => {
    const wrapper = mount({
      emits: ['update:open'],
      setup() {
        return {
          toggle: useTogglable(true, 'open'),
        };
      },
      mounted() {
        this.toggle.close();
      },
      template: '<div></div>',
    });

    expect(wrapper.emitted()).toEqual({ 'update:open': [[false]] });
  });

  it('updates isOpen when there’s a component instance and the prop value changes', async () => {
    const wrapper = mount(
      {
        props: ['modelValue'],
        setup(props) {
          return {
            toggle: useTogglable(props.modelValue, 'modelValue'),
          };
        },
        template: '<div></div>',
      },
      {
        props: {
          modelValue: false,
        },
      }
    );

    expect(wrapper.vm.toggle.isOpen.value).toEqual(false);
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.vm.toggle.isOpen.value).toEqual(true);
  });

  it('can be toggled with the toggle method', () => {
    const toggle = withSetup(() => useTogglable());

    toggle.toggle();

    expect(toggle.isOpen.value).toBe(true);
  });

  it('can be opened with the open method', () => {
    const toggle = withSetup(() => useTogglable());

    toggle.open();

    expect(toggle.isOpen.value).toBe(true);
  });

  it('can be closed with the open method', () => {
    const toggle = withSetup(() => useTogglable(true));

    toggle.close();

    expect(toggle.isOpen.value).toBe(false);
  });

  it('renderIfOpen executes render and return it when open', () => {
    const toggle = withSetup(() => useTogglable(true));
    const render = jest.fn(() => 'rendered');
    const fallback = jest.fn();

    const actual = toggle.renderIfOpen(render, fallback);

    expect(render).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
    expect(actual).toBe('rendered');
  });

  it('renderIfOpen executes fallback and return null when closed', () => {
    const toggle = withSetup(() => useTogglable());
    const render = jest.fn();
    const fallback = jest.fn();

    const actual = toggle.renderIfOpen(render, fallback);

    expect(fallback).toHaveBeenCalledTimes(1);
    expect(render).not.toHaveBeenCalled();
    expect(actual).toBe(null);
  });

  it('provides proper attributes for toggle button', () => {
    const toggle = withSetup(() => useTogglable());

    expect(toggle.attrs.btn.value['aria-controls']).toBe(toggle.uid.id.value);
  });

  it('provides proper attributes for toggle target', () => {
    const toggle = withSetup(() => useTogglable());

    expect(toggle.attrs.target.value.id).toBe(toggle.uid.id.value);
  });

  it('provides proper attributes for toggle button when closed', () => {
    const toggle = withSetup(() => useTogglable());

    expect(toggle.attrs.btn.value['aria-expanded']).toBe('false');
  });

  it('provides proper attributes for toggle button when open', () => {
    const toggle = withSetup(() => useTogglable(true));

    expect(toggle.attrs.btn.value['aria-expanded']).toBe('true');
  });

  it('listens for click on the button that toggles and stop propagation', () => {
    const toggle = withSetup(() => useTogglable());
    const event = { stopPropagation: jest.fn() };

    toggle.attrs.btn.value.onClick(event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(toggle.isOpen.value).toBe(true);
  });
});
