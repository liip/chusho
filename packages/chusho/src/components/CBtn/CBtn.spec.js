import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils';
import CBtn from './CBtn';

describe('CBtn', () => {
  it('should render the default slot as button content', () => {
    const wrapper = mount(CBtn, {
      context: {
        children: ['Action'],
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
      propsData: {
        type: 'submit',
      },
    });
    expect(wrapper.html()).toBe('<button type="submit"></button>');
  });

  it('should be a link if prop "href" is given', () => {
    const wrapper = mount(CBtn, {
      propsData: {
        href: '#',
      },
    });
    expect(wrapper.html()).toBe('<a href="#"></a>');
  });

  it('should be a RouterLink if prop "to" is given', () => {
    const wrapper = mount(CBtn, {
      propsData: {
        to: { name: 'home' },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    expect(wrapper.html()).toBe('<a></a>');
  });

  it('should be a NuxtLink if prop "to" is given in a Nuxt app', () => {
    const localVue = createLocalVue();
    localVue.prototype.$nuxt = {};

    const wrapper = mount(CBtn, {
      localVue,
      propsData: {
        to: { name: 'home' },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    expect(wrapper.html()).toBe('<a></a>');
  });

  it('should apply the "defaultClass" defined in the config', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          btn: {
            defaultClass: 'btn',
          },
        },
      },
    };
    const wrapper = mount(CBtn, {
      localVue,
    });
    expect(wrapper.html()).toBe('<button type="button" class="btn"></button>');
  });

  it('should apply the "disabledClass" defined in the config in addition to the "disabled" attribute when prop "disabled" is true', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          btn: {
            disabledClass: 'btn--disabled',
          },
        },
      },
    };
    const wrapper = mount(CBtn, {
      localVue,
      propsData: {
        disabled: true,
      },
    });
    expect(wrapper.html()).toBe(
      '<button disabled="disabled" type="button" class="btn--disabled"></button>'
    );
  });

  it('should apply the variant class defined in the config when "variant" prop is provided', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          btn: {
            variants: {
              primary: 'btn--primary',
            },
          },
        },
      },
    };
    const wrapper = mount(CBtn, {
      localVue,
      propsData: {
        variant: 'primary',
      },
    });
    expect(wrapper.html()).toBe(
      '<button type="button" class="btn--primary"></button>'
    );
  });

  it('should apply all the variants class defined in the config when "variant" prop contains multiple variants', () => {
    const localVue = createLocalVue();
    localVue.prototype.$chusho = {
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
    };
    const wrapper = mount(CBtn, {
      localVue,
      propsData: {
        variant: 'primary medium',
      },
    });
    expect(wrapper.html()).toBe(
      '<button type="button" class="btn--primary btn--medium"></button>'
    );
  });

  it('should not apply "disabled" nor "type" props on links', () => {
    const wrapper = mount(CBtn, {
      propsData: {
        href: '#',
        disabled: true,
        type: 'submit',
      },
    });
    expect(wrapper.html()).toBe('<a href="#"></a>');
  });

  it('should forward other attributes', () => {
    const wrapper = mount(CBtn, {
      propsData: {
        id: 'button',
      },
    });
    expect(wrapper.html()).toBe('<button id="button" type="button"></button>');
  });

  it('should forward event listeners to the native element', () => {
    const click = jest.fn();
    const wrapper = mount(CBtn, {
      listeners: {
        click,
      },
    });
    wrapper.findComponent(CBtn).trigger('click');
    expect(click).toHaveBeenCalled();
  });
});
