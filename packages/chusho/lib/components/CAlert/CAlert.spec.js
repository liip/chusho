import { mount } from '@vue/test-utils';

import CAlert from './CAlert';

describe('CAlert', () => {
  it('should render the default slot as alert content', () => {
    const wrapper = mount(CAlert, {
      slots: {
        default: ['Message'],
      },
    });
    expect(wrapper.html()).toBe('<div role="alert">Message</div>');
  });

  it('should be a div with role “alert” by default', () => {
    const wrapper = mount(CAlert);
    expect(wrapper.html()).toBe('<div role="alert"></div>');
  });

  it('should apply the "class" defined in the config', () => {
    const wrapper = mount(CAlert, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                alert: {
                  class: 'alert',
                },
              },
            },
          },
        },
      },
    });
    expect(wrapper.html()).toBe('<div role="alert" class="alert"></div>');
  });

  it('should apply the variant class defined in the config when "variant" prop is provided', () => {
    const wrapper = mount(CAlert, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                alert: {
                  class: ({ variant }) => ({
                    'alert--error': variant.includes('error'),
                  }),
                },
              },
            },
          },
        },
      },
      props: {
        variant: 'error',
      },
    });
    expect(wrapper.html()).toBe(
      '<div role="alert" class="alert--error"></div>'
    );
  });

  it('should combine class attribute', () => {
    const wrapper = mount(CAlert, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                alert: {
                  class: ({ variant }) => ({
                    'alert--error': variant.includes('error'),
                  }),
                },
              },
            },
          },
        },
      },
      props: {
        variant: 'error',
        class: 'extra-class',
      },
    });
    expect(wrapper.html()).toBe(
      '<div class="extra-class alert--error" role="alert"></div>'
    );
  });

  it('should not apply config class when `bare` prop is true', () => {
    const wrapper = mount(CAlert, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                alert: {
                  class: ({ variant }) => ({
                    'alert--error': variant.includes('error'),
                  }),
                },
              },
            },
          },
        },
      },
      props: {
        variant: 'error',
        class: 'extra-class',
        bare: true,
      },
    });
    expect(wrapper.html()).toBe('<div class="extra-class" role="alert"></div>');
  });

  it('should forward other attributes', () => {
    const wrapper = mount(CAlert, {
      props: {
        id: 'alert',
      },
    });
    expect(wrapper.html()).toBe('<div id="alert" role="alert"></div>');
  });

  it('should forward event listeners to the native element', () => {
    const onClick = jest.fn();
    const wrapper = mount(CAlert, {
      props: {
        onClick,
      },
    });
    wrapper.findComponent(CAlert).trigger('click');
    expect(onClick).toHaveBeenCalled();
  });
});
