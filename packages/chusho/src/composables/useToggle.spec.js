import { mount } from '@vue/test-utils';

import useToggle from './useToggle';
import uuid from '../utils/uuid';

describe('useToggle', () => {
  it('initialize with default value', () => {
    const toggle = useToggle(true);

    expect(toggle.isOpen.value).toBe(true);
  });

  it('has a unique ID', () => {
    const toggle = useToggle();

    expect(uuid).toHaveBeenCalledWith('chusho-toggle');
    expect(toggle.id).toBe('chusho-toggle-UNIQUE_ID');
  });

  it('emits when there’s a component instance and the value change using default prop name', () => {
    const wrapper = mount({
      setup() {
        return {
          toggle: useToggle(),
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
      setup() {
        return {
          toggle: useToggle(true, 'open'),
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
            toggle: useToggle(props.modelValue, 'modelValue'),
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
    const toggle = useToggle();

    toggle.toggle();

    expect(toggle.isOpen.value).toBe(true);
  });

  it('can be opened with the open method', () => {
    const toggle = useToggle();

    toggle.open();

    expect(toggle.isOpen.value).toBe(true);
  });

  it('can be closed with the open method', () => {
    const toggle = useToggle(true);

    toggle.close();

    expect(toggle.isOpen.value).toBe(false);
  });

  it('renderIfOpen executes render and return it when open', () => {
    const toggle = useToggle(true);
    const render = jest.fn(() => 'rendered');
    const fallback = jest.fn();

    const actual = toggle.renderIfOpen(render, fallback);

    expect(render).toHaveBeenCalledTimes(1);
    expect(fallback).not.toHaveBeenCalled();
    expect(actual).toBe('rendered');
  });

  it('renderIfOpen executes fallback and return null when closed', () => {
    const toggle = useToggle();
    const render = jest.fn();
    const fallback = jest.fn();

    const actual = toggle.renderIfOpen(render, fallback);

    expect(fallback).toHaveBeenCalledTimes(1);
    expect(render).not.toHaveBeenCalled();
    expect(actual).toBe(null);
  });

  it('provides proper attributes for toggle button', () => {
    const toggle = useToggle();

    expect(toggle.attrs.btn.value['aria-controls']).toBe(toggle.id);
  });

  it('provides proper attributes for toggle target', () => {
    const toggle = useToggle();

    expect(toggle.attrs.target.value.id).toBe(toggle.id);
  });

  it('provides proper attributes for toggle button when closed', () => {
    const toggle = useToggle();

    expect(toggle.attrs.btn.value['aria-expanded']).toBe('false');
  });

  it('provides proper attributes for toggle button when open', () => {
    const toggle = useToggle(true);

    expect(toggle.attrs.btn.value['aria-expanded']).toBe('true');
  });

  it('listens for click on the button that toggles and stop propagation', () => {
    const toggle = useToggle();
    const event = { stopPropagation: jest.fn() };

    toggle.attrs.btn.value.onClick(event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(toggle.isOpen.value).toBe(true);
  });
});
