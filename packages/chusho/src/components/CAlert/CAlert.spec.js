import { mount, createLocalVue } from '@vue/test-utils';
import CAlert from './CAlert';

describe('CAlert', () => {
  it('should render the default slot as alert content', () => {
    const wrapper = mount(CAlert, {
      context: {
        children: ['Message'],
      },
    });
    expect(wrapper.html()).toBe('<div role="alert">Message</div>');
  });

  it('should be a div with role “alert” by default', () => {
    const wrapper = mount(CAlert);
    expect(wrapper.html()).toBe('<div role="alert"></div>');
  });

  it('should apply the "defaultClass" defined in the config', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          alert: {
            defaultClass: 'alert',
          },
        },
      },
    };
    const wrapper = mount(CAlert, {
      localVue,
    });
    expect(wrapper.html()).toBe('<div role="alert" class="alert"></div>');
  });

  it('should apply the variant class defined in the config when "variant" prop is provided', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          alert: {
            variants: {
              error: 'alert--error',
            },
          },
        },
      },
    };
    const wrapper = mount(CAlert, {
      localVue,
      propsData: {
        variant: 'error',
      },
    });
    expect(wrapper.html()).toBe(
      '<div role="alert" class="alert--error"></div>'
    );
  });

  it('should apply all the variants class defined in the config when "variant" prop contains multiple variants', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          alert: {
            variants: {
              error: 'alert--error',
              inline: 'inline-block',
            },
          },
        },
      },
    };
    const wrapper = mount(CAlert, {
      localVue,
      propsData: {
        variant: 'error inline',
      },
    });
    expect(wrapper.html()).toBe(
      '<div role="alert" class="alert--error inline-block"></div>'
    );
  });

  it('should forward other attributes', () => {
    const wrapper = mount(CAlert, {
      propsData: {
        id: 'alert',
      },
    });
    expect(wrapper.html()).toBe('<div id="alert" role="alert"></div>');
  });

  it('should forward event listeners to the native element', () => {
    const click = jest.fn();
    const wrapper = mount(CAlert, {
      listeners: {
        click,
      },
    });
    wrapper.findComponent(CAlert).trigger('click');
    expect(click).toHaveBeenCalled();
  });
});
