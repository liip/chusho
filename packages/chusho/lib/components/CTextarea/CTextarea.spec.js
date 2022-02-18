import { mount } from '@vue/test-utils';

import CTextarea from './CTextarea';

describe('CTextarea', () => {
  it('renders with config class', () => {
    const wrapper = mount(CTextarea, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                textarea: {
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

  it('forwards random attributes to the textarea', () => {
    const wrapper = mount(CTextarea, {
      attrs: {
        name: 'my-field',
        id: 'my-field',
      },
    });

    expect(wrapper.html()).toEqual(
      '<textarea name="my-field" id="my-field"></textarea>'
    );
  });

  it('keeps the modelValue synchronized with the textarea value', async () => {
    const wrapper = mount({
      components: {
        CTextarea,
      },
      data() {
        return {
          text: 'something',
        };
      },
      template: '<CTextarea v-model="text" />',
    });
    const field = wrapper.find('textarea');

    expect(field.element.value).toEqual('something');

    await field.setValue('different');

    expect(
      wrapper.findComponent(CTextarea).emitted('update:modelValue')
    ).toEqual([['different']]);
    expect(wrapper.vm.text).toEqual('different');
  });
});
