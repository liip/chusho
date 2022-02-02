import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CSelect from './CSelect';
import CSelectBtn from './CSelectBtn';

describe('CSelect', () => {
  it('provides select API', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(CSelectBtn),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).vm.select).toEqual(
      wrapper.vm.select
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CSelect, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                select: {
                  class: 'select',
                },
              },
            },
          },
        },
      },
    });

    expect(wrapper.classes()).toEqual(['select']);
  });

  it.each(['Tab', 'Esc', 'Escape'])('closes when pressing %s key', (key) => {
    const wrapper = mount(CSelect, {
      props: {
        open: true,
      },
    });

    expect(wrapper.vm.select.togglable.isOpen.value).toEqual(true);
    wrapper.trigger('keydown', { key });
    expect(wrapper.vm.select.togglable.isOpen.value).toEqual(false);
  });

  it.each([
    ['Object', { value: 'Object Truth' }, 'Object Truth'],
    ['String', 'Truth', 'Truth'],
  ])(
    'renders a hidden input holding the current %s value',
    (type, modelValue, actualValue) => {
      const wrapper = mount(CSelect, {
        props: {
          modelValue,
        },
      });

      expect(wrapper.find('input').html()).toEqual(
        `<input type="hidden" value="${actualValue}">`
      );
    }
  );

  it('forwards the `name` prop to the underlying input', () => {
    const wrapper = mount(CSelect, {
      props: {
        name: 'field-name',
      },
    });

    expect(wrapper.find('input').html()).toEqual(
      `<input type="hidden" name="field-name">`
    );
  });

  it('applies the `input` prop as attributes on the underlying input', () => {
    const wrapper = mount(CSelect, {
      props: {
        input: {
          'data-test': 'my-input',
        },
      },
    });

    expect(wrapper.find('input').html()).toEqual(
      `<input data-test="my-input" type="hidden">`
    );
  });
});
