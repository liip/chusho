import { mount, RouterLinkStub } from '@vue/test-utils';
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

  it.skip('should be a NuxtLink if prop "to" is given in a Nuxt app', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
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

  it('should apply the "defaultClass" defined in the config', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  defaultClass: 'btn',
                },
              },
            },
          },
        },
      },
    });
    expect(wrapper.html()).toBe('<button type="button" class="btn"></button>');
  });

  it('should apply the "disabledClass" defined in the config in addition to the "disabled" attribute when prop "disabled" is true', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  disabledClass: 'btn--disabled',
                },
              },
            },
          },
        },
      },
      props: {
        disabled: true,
      },
    });
    expect(wrapper.html()).toBe(
      '<button disabled="" type="button" class="btn--disabled"></button>'
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
                  variants: {
                    primary: 'btn--primary',
                  },
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

  it('should warn if requested variant does not exists', () => {
    mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  variants: {
                    somethingelse: 'something',
                  },
                },
              },
            },
          },
        },
      },
      props: {
        variant: 'doesnotexist',
      },
    });

    expect('Cannot find Button variant named').toHaveBeenWarned();
  });

  it('should apply all the variants class defined in the config when "variant" prop contains multiple variants', () => {
    const wrapper = mount(CBtn, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  variants: {
                    primary: 'btn--primary',
                    medium: 'btn--medium',
                  },
                },
              },
            },
          },
        },
      },
      props: {
        variant: 'primary medium',
      },
    });
    expect(wrapper.html()).toBe(
      '<button type="button" class="btn--primary btn--medium"></button>'
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
