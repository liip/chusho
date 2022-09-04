import { mount } from '@vue/test-utils';

import { withSetup } from '../../test/utils';

import useTogglable from './useTogglable';

describe('useTogglable', () => {
  it('initialize with default value', () => {
    const { composable } = withSetup(() => useTogglable(true));

    expect(composable.isOpen.value).toBe(true);
  });

  it('has a unique ID', () => {
    const { composable } = withSetup(() => useTogglable());

    expect(composable.uid.id.value).toBe('chusho-toggle-0');
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
    const { composable } = withSetup(() => useTogglable());

    composable.toggle();

    expect(composable.isOpen.value).toBe(true);
  });

  it('can be opened with the open method', () => {
    const { composable } = withSetup(() => useTogglable());

    composable.open();

    expect(composable.isOpen.value).toBe(true);
  });

  it('can be closed with the open method', () => {
    const { composable } = withSetup(() => useTogglable(true));

    composable.close();

    expect(composable.isOpen.value).toBe(false);
  });

  it('renderIfOpen executes render and return it when open', () => {
    const { composable } = withSetup(() => useTogglable(true));
    const render = vi.fn(() => 'rendered');
    const fallback = vi.fn();

    const actual = composable.renderIfOpen(render, fallback);

    expect(render).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
    expect(actual).toBe('rendered');
  });

  it('renderIfOpen executes fallback and return null when closed', () => {
    const { composable } = withSetup(() => useTogglable());
    const render = vi.fn();
    const fallback = vi.fn();

    const actual = composable.renderIfOpen(render, fallback);

    expect(fallback).toHaveBeenCalledTimes(1);
    expect(render).not.toHaveBeenCalled();
    expect(actual).toBe(null);
  });

  it('provides proper attributes for toggle button', () => {
    const { composable } = withSetup(() => useTogglable());

    expect(composable.attrs.btn.value['aria-controls']).toBe(
      composable.uid.id.value
    );
  });

  it('provides proper attributes for toggle target', () => {
    const { composable } = withSetup(() => useTogglable());

    expect(composable.attrs.target.value.id).toBe(composable.uid.id.value);
  });

  it('provides proper attributes for toggle button when closed', () => {
    const { composable } = withSetup(() => useTogglable());

    expect(composable.attrs.btn.value['aria-expanded']).toBe('false');
  });

  it('provides proper attributes for toggle button when open', () => {
    const { composable } = withSetup(() => useTogglable(true));

    expect(composable.attrs.btn.value['aria-expanded']).toBe('true');
  });

  it('listens for click on the button that toggles and stop propagation', () => {
    const { composable } = withSetup(() => useTogglable());
    const event = { stopPropagation: vi.fn() };

    composable.attrs.btn.value.onClick(event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(composable.isOpen.value).toBe(true);
  });
});
