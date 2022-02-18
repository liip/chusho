import { mount } from '@vue/test-utils';

import CTextField from './CTextField';

describe('CTextField', () => {
  it('renders with config class', () => {
    const wrapper = mount(CTextField, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                textField: {
                  class: 'field',
                },
              },
            },
          },
        },
      },
    });

    expect(wrapper.classes()).toEqual(['field']);
  });

  it('renders with type “text” by default', () => {
    const wrapper = mount(CTextField);

    expect(wrapper.html()).toEqual('<input type="text">');
  });

  it('renders with the given type', () => {
    const wrapper = mount(CTextField, {
      props: {
        type: 'email',
      },
    });

    expect(wrapper.attributes('type')).toEqual('email');
  });

  it('forwards random attributes to the input', () => {
    const wrapper = mount(CTextField, {
      attrs: {
        name: 'my-field',
        id: 'my-field',
      },
    });

    expect(wrapper.html()).toEqual(
      '<input name="my-field" id="my-field" type="text">'
    );
  });

  it('keeps the modelValue synchronized with the input value', async () => {
    const wrapper = mount({
      components: {
        CTextField,
      },
      data() {
        return {
          text: 'something',
        };
      },
      template: '<CTextField v-model="text" />',
    });
    const field = wrapper.find('input');

    expect(field.element.value).toEqual('something');

    await field.setValue('different');

    expect(
      wrapper.findComponent(CTextField).emitted('update:modelValue')
    ).toEqual([['different']]);
    expect(wrapper.vm.text).toEqual('different');
  });
});
