import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import CSelect from './CSelect';
import CSelectBtn from './CSelectBtn';
import CSelectOption from './CSelectOption';
import CSelectOptions from './CSelectOptions';

describe('CSelectOption', () => {
  it('renders with the right attributes when open', async () => {
    const wrapper = mount(CSelect, {
      props: {
        modelValue: 'a',
        open: true,
      },
      slots: {
        default: h(CSelectOptions, null, () => [
          h(CSelectOption, { value: 'a' }),
        ]),
      },
    });

    await nextTick();

    expect(wrapper.findComponent(CSelectOptions).attributes()).toEqual({
      id: 'chusho-toggle-0',
      role: 'listbox',
      'aria-activedescendant': 'chusho-select-option-1',
    });
  });

  it('does not render when closed', () => {
    const wrapper = mount(CSelect, {
      props: {
        modelValue: 'a',
      },
      slots: {
        default: h(CSelectOptions),
      },
    });

    expect(wrapper.findComponent(CSelectOptions).html()).toBe('');
  });

  it('renders with config class', () => {
    const wrapper = mount(CSelect, {
      props: {
        open: true,
      },
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                selectOptions: {
                  class: 'select-options',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CSelectOptions),
      },
    });

    expect(wrapper.findComponent(CSelectOptions).classes()).toEqual([
      'select-options',
    ]);
  });

  it('save focused element before opening and restore it after closing', async () => {
    const wrapper = mount(CSelect, {
      attachTo: document.body,
      props: {
        modelValue: 'a',
        open: false,
      },
      slots: {
        default: [
          h(CSelectBtn),
          h(CSelectOptions, null, () => [h(CSelectOption, { value: 'a' })]),
        ],
      },
    });
    const btn = wrapper.findComponent(CSelectBtn);
    const options = wrapper.findComponent(CSelectOptions);

    btn.vm.$el.focus();
    expect(document.activeElement).toBe(btn.vm.$el);

    await btn.trigger('click');
    await nextTick();
    expect(options.vm.activeElement.element.value).toBe(btn.vm.$el);
    expect(document.activeElement).toBe(
      wrapper.findComponent(CSelectOption).vm.$el
    );
    document.body.click(); // Close the select
    await nextTick();
    expect(options.vm.activeElement.element.value).toBe(btn.vm.$el);

    wrapper.unmount();
  });

  it('moves focus using keyboard arrows without looping', async () => {
    const wrapper = mount(CSelect, {
      attachTo: document.body,
      props: {
        open: true,
        modelValue: 'a',
      },
      slots: {
        default: h(
          CSelectOptions,
          {},
          {
            default: () => [
              h(CSelectOption, { value: 'a' }, { default: () => 'A' }),
              h(CSelectOption, { value: 'b' }, { default: () => 'B' }),
              h(CSelectOption, { value: 'c' }, { default: () => 'C' }),
            ],
          }
        ),
      },
    });
    const options = wrapper.findComponent(CSelectOptions);

    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[0]);

    await options.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[1]);

    await options.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[2]);

    await options.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[2]);

    await options.trigger('keydown', { key: 'Home' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[0]);

    await options.trigger('keydown', { key: 'End' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[2]);

    await options.trigger('keydown', { key: 'ArrowUp' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[1]);

    wrapper.unmount();
  });

  it('moves focus to the best match when typing', async () => {
    const wrapper = mount(CSelect, {
      attachTo: document.body,
      props: {
        open: true,
        modelValue: 'r',
      },
      slots: {
        default: h(
          CSelectOptions,
          {},
          {
            default: () => [
              h(CSelectOption, { value: 'r' }, { default: () => 'Red' }),
              h(CSelectOption, { value: 'g' }, { default: () => 'Blue' }),
              h(CSelectOption, { value: 'b' }, { default: () => 'Green' }),
            ],
          }
        ),
      },
    });
    const options = wrapper.findComponent(CSelectOptions);

    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[0]);

    await options
      .findAllComponents(CSelectOption)[0]
      .trigger('keydown', { key: 'g' });
    await options
      .findAllComponents(CSelectOption)[0]
      .trigger('keydown', { key: 'r' });
    await nextTick();
    expect(document.activeElement).toBe(options.vm.$el.children[2]);

    await new Promise((resolve) => {
      // Wait for the previous search to clear itself before beginning a new one
      setTimeout(async () => {
        await options
          .findAllComponents(CSelectOption)[0]
          .trigger('keydown', { key: 'r' });
        await nextTick();
        expect(document.activeElement).toBe(options.vm.$el.children[0]);

        wrapper.unmount();

        resolve();
      }, 500);
    });
  });
});
