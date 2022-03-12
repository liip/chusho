import { mount } from '@vue/test-utils';
import { h, inject } from 'vue';

import { CCheckbox } from '../CCheckbox';
import { CLabel } from '../CLabel';
import { CRadio } from '../CRadio';
import { CSelect, CSelectBtn } from '../CSelect';
import { CTextField } from '../CTextField';
import { CTextarea } from '../CTextarea';
import CFormGroup, { FormGroupSymbol } from './CFormGroup';

describe('CFormGroup', () => {
  it('is renderless by default', () => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: 'Content',
      },
    });
    expect(wrapper.html()).toEqual('Content');
  });

  it('renders element from “as” prop', () => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: 'Content',
      },
      props: {
        as: 'div',
      },
    });
    expect(wrapper.html()).toEqual('<div>Content</div>');
  });

  it('renders element from “as” config option', () => {
    const wrapper = mount(CFormGroup, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                formGroup: {
                  as: 'div',
                },
              },
            },
          },
        },
      },
      slots: {
        default: 'Content',
      },
    });
    expect(wrapper.html()).toEqual('<div>Content</div>');
  });

  it('is renderless when “as” prop is false, overriding the config option', () => {
    const wrapper = mount(CFormGroup, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                formGroup: {
                  as: 'div',
                },
              },
            },
          },
        },
      },
      slots: {
        default: 'Content',
      },
      props: {
        as: false,
      },
    });
    expect(wrapper.html()).toEqual('Content');
  });

  it('renders with config classes', () => {
    const wrapper = mount(CFormGroup, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                formGroup: {
                  class: ({ disabled, required, readonly }) => {
                    return { disabled, required, readonly };
                  },
                },
              },
            },
          },
        },
      },
      props: {
        as: 'div',
        disabled: true,
        required: true,
        readonly: true,
      },
    });

    expect(wrapper.classes()).toEqual(['disabled', 'required', 'readonly']);
  });

  it('provides formGroup to child components', async () => {
    let formGroup = null;
    const wrapper = mount(CFormGroup, {
      slots: {
        default: {
          setup() {
            formGroup = inject(FormGroupSymbol, null);
          },
          render() {
            return null;
          },
        },
      },
    });

    expect(formGroup.disabled.value).toBe(undefined);
    expect(formGroup.required.value).toBe(undefined);
    expect(formGroup.readonly.value).toBe(undefined);
    expect(formGroup.ids).toBeDefined();

    await wrapper.setProps({
      disabled: false,
      required: false,
      readonly: false,
    });

    expect(formGroup.disabled.value).toBe(false);
    expect(formGroup.required.value).toBe(false);
    expect(formGroup.readonly.value).toBe(false);

    await wrapper.setProps({ disabled: true, required: true, readonly: true });

    expect(formGroup.disabled.value).toBe(true);
    expect(formGroup.required.value).toBe(true);
    expect(formGroup.readonly.value).toBe(true);
  });

  it('inherits flags from parent formGroup', () => {
    const wrapper = mount(CFormGroup, {
      props: {
        disabled: true,
        required: true,
        readonly: true,
      },
      slots: {
        default: h(CFormGroup, { as: 'div', 'data-test': 'child' }),
      },
    });

    const child = wrapper.findComponent('[data-test="child"]');

    expect(child.vm.formGroup.disabled.value).toBe(true);
    expect(child.vm.formGroup.required.value).toBe(true);
    expect(child.vm.formGroup.readonly.value).toBe(true);
  });

  it('overrides flags from parent formGroup', () => {
    const wrapper = mount(CFormGroup, {
      props: {
        disabled: true,
        required: false,
        readonly: true,
      },
      slots: {
        default: h(CFormGroup, {
          as: 'div',
          'data-test': 'child',
          disabled: false,
          required: true,
          readonly: false,
        }),
      },
    });

    const child = wrapper.findComponent('[data-test="child"]');

    expect(child.vm.formGroup.disabled.value).toBe(false);
    expect(child.vm.formGroup.required.value).toBe(true);
    expect(child.vm.formGroup.readonly.value).toBe(false);
  });

  it('sets CLabel `for` attribute with the form group field ID', () => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: h(CLabel),
      },
    });

    expect(wrapper.findComponent(CLabel).attributes('for')).toBe(
      'chusho-field-0'
    );
  });

  it('sets CLabel `id` attribute with the form group label ID', () => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: h(CLabel),
      },
    });

    expect(wrapper.findComponent(CLabel).attributes('id')).toBe(
      'chusho-label-0'
    );
  });

  it('keeps CLabel `id` attribute from prop', () => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: h(CLabel, { id: 'label-id' }),
      },
    });

    expect(wrapper.findComponent(CLabel).attributes('id')).toBe('label-id');
  });

  it.each([
    ['CTextField', CTextField],
    ['CTextarea', CTextarea],
    ['CRadio', CRadio],
    ['CCheckbox', CCheckbox],
  ])('fill %s `id` attribute with the form group field ID', (name, comp) => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: h(comp, { value: 'value' }),
      },
    });

    expect(wrapper.findComponent(comp).attributes('id')).toBe('chusho-field-0');
  });

  it.each([
    ['CTextField', CTextField],
    ['CTextarea', CTextarea],
    ['CRadio', CRadio],
    ['CCheckbox', CCheckbox],
  ])('keeps %s `id` attribute from prop', (name, comp) => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: h(comp, { id: 'field-id', value: 'value' }),
      },
    });

    expect(wrapper.findComponent(comp).attributes('id')).toBe('field-id');
  });

  it('sets CSelectBtn `aria-labelledby` attribute with both the form group label ID and the select button ID', () => {
    const wrapper = mount(CFormGroup, {
      slots: {
        default: h(CSelect, () => h(CSelectBtn)),
      },
    });

    expect(
      wrapper.findComponent(CSelectBtn).attributes('aria-labelledby')
    ).toBe('chusho-label-0 chusho-select-btn-2');
  });

  it.each([
    ['CTextField', CTextField],
    ['CTextarea', CTextarea],
    ['CRadio', CRadio],
    ['CCheckbox', CCheckbox],
  ])('sets `required` attribute on %s', (name, comp) => {
    const wrapper = mount(CFormGroup, {
      props: {
        required: true,
      },
      slots: {
        default: h(comp, { value: 'value' }),
      },
    });

    expect(wrapper.findComponent(comp).attributes('required')).toBe('');
  });

  it.each([
    ['CTextField', CTextField],
    ['CTextarea', CTextarea],
    ['CRadio', CRadio],
    ['CCheckbox', CCheckbox],
  ])('sets `disabled` attribute on %s', (name, comp) => {
    const wrapper = mount(CFormGroup, {
      props: {
        disabled: true,
      },
      slots: {
        default: h(comp, { value: 'value' }),
      },
    });

    expect(wrapper.findComponent(comp).attributes('disabled')).toBe('');
  });

  it('sets `disabled` attribute on CSelectBtn', () => {
    const wrapper = mount(CFormGroup, {
      props: {
        disabled: true,
      },
      slots: {
        default: h(CSelect, () => h(CSelectBtn)),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).attributes('disabled')).toBe('');
  });

  it.each([
    ['CTextField', CTextField],
    ['CTextarea', CTextarea],
  ])('sets `readonly` attribute on %s', (name, comp) => {
    const wrapper = mount(CFormGroup, {
      props: {
        readonly: true,
      },
      slots: {
        default: h(comp, { value: 'value' }),
      },
    });

    expect(wrapper.findComponent(comp).attributes('readonly')).toBe('');
  });

  it.each([
    ['CRadio', CRadio],
    ['CCheckbox', CCheckbox],
  ])('doesn’t set `readonly` attribute on %s', (name, comp) => {
    const wrapper = mount(CFormGroup, {
      props: {
        readonly: true,
      },
      slots: {
        default: h(comp, { value: 'value' }),
      },
    });

    expect(wrapper.findComponent(comp).attributes('readonly')).toBeUndefined();
  });
});
