import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';

import CSelect from './CSelect';
import CSelectOption from './CSelectOption';
import CSelectOptions from './CSelectOptions';

describe('CSelectOption', () => {
  it('renders with the right attributes when selected', () => {
    const wrapper = mount(CSelect, {
      props: {
        modelValue: 'a',
      },
      slots: {
        default: h(CSelectOption, { value: 'a' }, { default: () => 'Label' }),
      },
    });

    expect(wrapper.findComponent(CSelectOption).html()).toBe(
      '<li id="chusho-interactive-list-item-1" role="option" tabindex="-1" aria-selected="true">Label</li>'
    );
  });

  it('renders with the right attributes when not selected', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(CSelectOption, { value: 'a' }, { default: () => 'Label' }),
      },
    });

    expect(wrapper.findComponent(CSelectOption).html()).toBe(
      '<li id="chusho-interactive-list-item-1" role="option" tabindex="-1" aria-selected="false">Label</li>'
    );
  });

  it('renders with the right attributes when disabled', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(
          CSelectOption,
          { value: 'a', disabled: true },
          { default: () => 'Label' }
        ),
      },
    });

    expect(wrapper.findComponent(CSelectOption).html()).toBe(
      '<li id="chusho-interactive-list-item-1" role="option" tabindex="-1" aria-disabled="true" aria-selected="false">Label</li>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CSelect, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                selectOption: {
                  class: ({ selected, disabled }) => [
                    'select-option',
                    { selected, disabled },
                  ],
                },
              },
            },
          },
        },
      },
      props: {
        modelValue: 'a',
        open: true,
      },
      slots: {
        default: h(CSelectOptions, () =>
          h(CSelectOption, { value: 'a', disabled: true })
        ),
      },
    });

    expect(wrapper.findComponent(CSelectOption).classes()).toEqual([
      'select-option',
      'selected',
      'disabled',
    ]);
  });

  it('registers itself as a select option with id, disabled status and text content', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(CSelectOption, { value: 'a' }, { default: () => 'Label' }),
      },
    });

    expect(wrapper.vm.interactiveList.items.value).toEqual([
      {
        id: 'chusho-interactive-list-item-1',
        disabled: false,
        text: 'label',
        value: 'a',
      },
    ]);
  });

  it('unregisters itself when unmounted', async () => {
    const rendered = ref(true);
    const wrapper = mount(CSelect, {
      slots: {
        default: () =>
          rendered.value
            ? h(CSelectOption, { value: 'a' }, { default: () => 'Label' })
            : null,
      },
    });

    expect(wrapper.vm.interactiveList.items.value.length).toBe(1);
    rendered.value = false;
    await nextTick();

    expect(wrapper.vm.interactiveList.items.value.length).toBe(0);
  });

  it('sets itself as the focused option if it is the currently selected option', async () => {
    const wrapper = mount(CSelect, {
      props: {
        modelValue: 'a',
        open: true,
      },
      slots: {
        default: h(CSelectOption, { value: 'a' }, { default: () => 'Label' }),
      },
    });

    await nextTick();

    expect(wrapper.vm.interactiveList.activeItem.value).toEqual(
      'chusho-interactive-list-item-1'
    );
  });

  it('update v-model and close on click when not disabled', async () => {
    const wrapper = mount(CSelect, {
      props: {
        open: true,
        modelValue: 'a',
      },
      slots: {
        default: [
          h(CSelectOption, { value: 'a' }, { default: () => 'A' }),
          h(CSelectOption, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    });

    expect(wrapper.vm.popup.expanded.value).toBe(true);
    await wrapper.findAllComponents(CSelectOption)[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']]);
    expect(wrapper.vm.popup.expanded.value).toBe(false);
  });

  it.each(['Enter', 'Spacebar', ' '])(
    'update v-model and close when pressing "%s" on the focused item',
    async (key) => {
      const wrapper = mount(CSelect, {
        props: {
          open: true,
          modelValue: 'a',
        },
        slots: {
          default: [
            h(CSelectOption, { value: 'a' }, { default: () => 'A' }),
            h(CSelectOption, { value: 'b' }, { default: () => 'B' }),
          ],
        },
      });

      expect(wrapper.vm.popup.expanded.value).toBe(true);
      await wrapper
        .findAllComponents(CSelectOption)[1]
        .trigger('keydown', { key });
      expect(wrapper.emitted('update:modelValue')).toEqual([['b']]);
      expect(wrapper.vm.popup.expanded.value).toBe(false);
    }
  );

  it('focuses itself after being rendered if it’s the currently active option', async () => {
    const wrapper = mount(CSelect, {
      attachTo: document.body,
      props: {
        open: true,
        modelValue: 'b',
      },
      slots: {
        default: [
          h(CSelectOption, { value: 'a' }, { default: () => 'A' }),
          h(CSelectOption, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    });

    await nextTick();

    expect(wrapper.findAllComponents(CSelectOption)[1].vm.$el).toBe(
      document.activeElement
    );

    wrapper.unmount();
  });

  it('render a non-breakin space if it has no default slots', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: [h(CSelectOption, { value: 'a' })],
      },
    });

    expect(wrapper.findComponent(CSelectOption).vm.$el.innerHTML).toBe(
      '&nbsp;'
    );
  });
});
