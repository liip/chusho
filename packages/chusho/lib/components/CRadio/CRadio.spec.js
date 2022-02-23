import { mount } from '@vue/test-utils';

import CRadio from './CRadio';

describe('CRadio', () => {
  it('renders with config checked class', () => {
    const wrapper = mount(CRadio, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                radio: {
                  class: ({ checked }) => {
                    return { checked };
                  },
                },
              },
            },
          },
        },
      },
      props: {
        modelValue: 'foo',
        value: 'foo',
      },
    });

    expect(wrapper.classes()).toEqual(['checked']);
  });

  it('renders with correct attributes by default', () => {
    const wrapper = mount(CRadio, {
      props: {
        value: true,
      },
    });

    expect(wrapper.html()).toEqual('<input type="radio" value="true">');
  });

  it('renders with extra attributes', () => {
    const wrapper = mount(CRadio, {
      props: {
        value: true,
      },
      attrs: {
        id: 'radio',
      },
    });

    expect(wrapper.html()).toEqual(
      '<input id="radio" type="radio" value="true">'
    );
  });

  it('keeps the modelValue synchronized with a single radio', async () => {
    const wrapper = mount({
      components: {
        CRadio,
      },
      data() {
        return {
          value: false,
        };
      },
      template: '<CRadio v-model="value" :value="true" />',
    });
    const radio = wrapper.findComponent(CRadio);

    expect(radio.vm.modelValue).toBe(false);
    expect(radio.element.checked).toBe(false);

    await radio.setValue(true);
    expect(radio.vm.modelValue).toBe(true);
    expect(radio.element.checked).toBe(true);
    expect(radio.emitted('update:modelValue')).toEqual([[true]]);

    await wrapper.setData({ value: false });
    expect(radio.vm.modelValue).toBe(false);
    expect(radio.element.checked).toBe(false);
  });

  it('keeps the modelValue synchronized with multiple radios', async () => {
    const wrapper = mount({
      components: {
        CRadio,
      },
      data() {
        return {
          value: false,
        };
      },
      template: `<CRadio id="1" v-model="value" :value="true" /><CRadio id="2" v-model="value" :value="false" />`,
    });
    const radios = wrapper.findAllComponents(CRadio);

    expect(radios[0].vm.modelValue).toBe(false);
    expect(radios[0].element.checked).toBe(false);
    expect(radios[1].vm.modelValue).toBe(false);
    expect(radios[1].element.checked).toBe(true);

    await radios[0].setValue(true);
    expect(radios[0].vm.modelValue).toBe(true);
    expect(radios[0].element.checked).toBe(true);
    expect(radios[0].emitted('update:modelValue')).toEqual([[true]]);
    expect(radios[1].vm.modelValue).toBe(true);
    expect(radios[1].element.checked).toBe(false);

    await wrapper.setData({ value: false });
    expect(radios[0].vm.modelValue).toBe(false);
    expect(radios[0].element.checked).toBe(false);
    expect(radios[1].vm.modelValue).toBe(false);
    expect(radios[1].element.checked).toBe(true);

    await radios[0].trigger('change');
    expect(radios[0].vm.modelValue).toBe(true);
    expect(radios[0].element.checked).toBe(true);
    expect(radios[1].vm.modelValue).toBe(true);
    expect(radios[1].element.checked).toBe(false);
  });
});
