import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import textFieldMixin from '../components/mixins/textFieldMixin';

import CFormGroup from '../components/CFormGroup/CFormGroup';

import useFormGroup from './useFormGroup';

const ComponentWithinFormGroup = defineComponent({
  mixins: [textFieldMixin],

  setup(props) {
    return {
      formGroup: useFormGroup(props, ['required', 'disabled', 'readonly']),
    };
  },

  render() {
    return h('input');
  },
});

describe('useFormGroup', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(CFormGroup, {
      props: {
        required: false,
        disabled: false,
        readonly: false,
      },
      slots: {
        default: () => h(ComponentWithinFormGroup),
      },
    });
  });

  it('exposes the form group', () => {
    expect(
      wrapper.findComponent(ComponentWithinFormGroup).vm.formGroup
    ).toMatchObject({
      flags: {
        required: false,
        disabled: false,
        readonly: false,
      },
      formGroup: {
        // Exact value is not important, just that it's an object
      },
    });
  });

  it('has reactive flags', async () => {
    expect(
      wrapper.findComponent(ComponentWithinFormGroup).vm.formGroup.flags
    ).toMatchObject({
      required: false,
      disabled: false,
      readonly: false,
    });

    await wrapper.setProps({
      required: true,
      disabled: true,
      readonly: true,
    });

    expect(
      wrapper.findComponent(ComponentWithinFormGroup).vm.formGroup.flags
    ).toStrictEqual({
      required: true,
      disabled: true,
      readonly: true,
    });
  });
});
