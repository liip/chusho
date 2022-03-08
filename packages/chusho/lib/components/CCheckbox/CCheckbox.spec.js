import { mount } from '@vue/test-utils';

import CCheckbox from './CCheckbox';

describe('CCheckbox', () => {
  it('renders with config checked class', () => {
    const wrapper = mount(CCheckbox, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                checkbox: {
                  class: ({ checked, disabled, required }) => {
                    return { checked, disabled, required };
                  },
                },
              },
            },
          },
        },
      },
      props: {
        modelValue: true,
        disabled: true,
        required: true,
      },
    });

    expect(wrapper.classes()).toEqual(['checked', 'disabled', 'required']);
  });

  it('renders with correct attributes by default', () => {
    const wrapper = mount(CCheckbox);

    expect(wrapper.html()).toEqual('<input type="checkbox">');
  });

  it('apply flags as attributes to the input', () => {
    const wrapper = mount(CCheckbox, {
      props: {
        required: true,
        disabled: true,
      },
    });

    expect(wrapper.html()).toEqual(
      '<input type="checkbox" required="" disabled="">'
    );
  });

  it('renders with extra attributes', () => {
    const wrapper = mount(CCheckbox, {
      attrs: {
        id: 'checkbox',
      },
    });

    expect(wrapper.html()).toEqual('<input id="checkbox" type="checkbox">');
  });

  it('keeps the modelValue synchronized with the checkbox value', async () => {
    const wrapper = mount({
      components: {
        CCheckbox,
      },
      data() {
        return {
          value: false,
        };
      },
      template: '<CCheckbox v-model="value" />',
    });
    const checkbox = wrapper.findComponent(CCheckbox);

    expect(checkbox.vm.modelValue).toBe(false);
    expect(checkbox.element.checked).toBe(false);

    await checkbox.setValue(true);
    expect(checkbox.vm.modelValue).toBe(true);
    expect(checkbox.element.checked).toBe(true);
    expect(checkbox.emitted('update:modelValue')).toEqual([[true]]);

    await wrapper.setData({ value: false });
    expect(checkbox.vm.modelValue).toBe(false);
    expect(checkbox.element.checked).toBe(false);
  });

  it('accepts custom true/false values', async () => {
    const wrapper = mount({
      components: {
        CCheckbox,
      },
      data() {
        return {
          value: 'off',
        };
      },
      template: '<CCheckbox v-model="value" trueValue="on" falseValue="off" />',
    });
    const checkbox = wrapper.findComponent(CCheckbox);

    expect(checkbox.vm.modelValue).toBe('off');
    expect(checkbox.element.checked).toBe(false);

    await checkbox.setValue('on');
    expect(checkbox.vm.modelValue).toBe('on');
    expect(checkbox.element.checked).toBe(true);

    await checkbox.setValue('off');
    expect(checkbox.vm.modelValue).toBe('off');
    expect(checkbox.element.checked).toBe(false);

    await wrapper.setData({ value: 'on' });
    expect(checkbox.vm.modelValue).toBe('on');
    expect(checkbox.element.checked).toBe(true);

    await checkbox.trigger('click');
    await checkbox.trigger('change');
    expect(checkbox.vm.modelValue).toBe('off');
    expect(checkbox.element.checked).toBe(false);

    await checkbox.trigger('click');
    await checkbox.trigger('change');
    expect(checkbox.vm.modelValue).toBe('on');
    expect(checkbox.element.checked).toBe(true);

    expect(checkbox.emitted('update:modelValue')).toEqual([
      ['on'],
      ['off'],
      ['off'],
      ['on'],
    ]);
  });
});
