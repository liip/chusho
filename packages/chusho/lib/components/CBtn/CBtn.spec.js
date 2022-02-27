import { RouterLinkStub, mount } from '@vue/test-utils';

import CBtn from './CBtn';

describe('CBtn', () => {
  it('should render the default slot as button content', () => {
    const wrapper = mount(CBtn, {
      slots: {
        default: ['Action'],
      },
    });
    expect(wrapper.html()).toBe('<button type="button">Action</button>');
  });

  it('should be a button with type button by default', () => {
    const wrapper = mount(CBtn);
    expect(wrapper.html()).toBe('<button type="button"></button>');
  });

  it('should be a button with type submit when prop "type" is set to submit', () => {
    const wrapper = mount(CBtn, {
      props: {
        type: 'submit',
      },
    });
    expect(wrapper.html()).toBe('<button type="submit"></button>');
  });

  it('should be a link if prop "href" is given', () => {
    const wrapper = mount(CBtn, {
      props: {
        href: '#',
      },
      slots: {
        default: ['Action'],
      },
    });
    expect(wrapper.html()).toBe('<a href="#">Action</a>');
  });

  it('should be a RouterLink if prop "to" is given', () => {
    const wrapper = mount(CBtn, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
      props: {
        to: { name: 'home' },
      },
      slots: {
        default: '',
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    expect(wrapper.html()).toBe('<a></a>');
  });

  it('should warn if prop "to" is given and no RouterLink can be found', () => {
    mount(CBtn, {
      global: {
        config: {
          warnHandler: () => {
            // Mute Vue warnings
          },
        },
      },
      props: {
        to: { name: 'home' },
      },
      slots: {
        default: 'Action',
      },
    });

    expect('RouterLink component couldn’t be found').toHaveBeenWarned();
  });

  it('should be a NuxtLink if prop "to" is given in a Nuxt app', () => {
    const wrapper = mount(CBtn, {
      global: {
        mocks: {
          $nuxt: {},
        },
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: {
        to: { name: 'home' },
      },
      slots: {
        default: '',
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    expect(wrapper.html()).toBe('<a></a>');
  });

  it('should apply the "class" defined in the config', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  class: 'btn',
                },
              },
            },
          },
        },
      },
    });
    expect(wrapper.html()).toBe('<button type="button" class="btn"></button>');
  });

  it('should not apply the "class" defined in the config when `bare` prop is true', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  class: 'btn',
                },
              },
            },
          },
        },
      },
      props: {
        bare: true,
        class: 'berry',
      },
    });
    expect(wrapper.html()).toBe(
      '<button class="berry" type="button"></button>'
    );
  });

  it('should apply the variant class defined in the config when "variant" prop is provided', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  class: ({ variant }) => ({
                    'btn--primary': variant.includes('primary'),
                  }),
                },
              },
            },
          },
        },
      },
      props: {
        variant: 'primary',
      },
    });
    expect(wrapper.html()).toBe(
      '<button type="button" class="btn--primary"></button>'
    );
  });

  it('should apply the active class defined in the config when "active" prop is provided', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  class: ({ active }) => ({
                    'btn--active': active,
                  }),
                },
              },
            },
          },
        },
      },
      props: {
        active: true,
      },
    });
    expect(wrapper.html()).toBe(
      '<button type="button" class="btn--active"></button>'
    );
  });

  it('should not apply "disabled" nor "type" props on links', () => {
    const wrapper = mount(CBtn, {
      props: {
        href: '#',
        disabled: true,
        type: 'submit',
      },
    });
    expect(wrapper.html()).toBe('<a href="#"></a>');
  });

  it('should forward other attributes', () => {
    const wrapper = mount(CBtn, {
      props: {
        id: 'button',
      },
    });
    expect(wrapper.html()).toBe('<button id="button" type="button"></button>');
  });

  it('should forward event listeners to the native element', () => {
    const onClick = jest.fn();
    const wrapper = mount(CBtn, {
      props: {
        onClick,
      },
    });
    wrapper.findComponent(CBtn).trigger('click');
    expect(onClick).toHaveBeenCalled();
  });
});
