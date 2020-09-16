import { mount, createLocalVue } from '@vue/test-utils';
import CFlex from './CFlex';
import CFlexItem from './CFlexItem';

describe('CFlex', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.prototype.$chusho = {
      options: {
        components: {
          flex: {
            containerClass: 'flex',
            gaps: {
              x: {
                1: { containerClass: '-ml-1', itemClass: 'pl-1' },
                2: { containerClass: '-ml-2', itemClass: 'pl-2' },
              },
              y: {
                1: { containerClass: '-mt-1', itemClass: 'pt-1' },
                2: { containerClass: '-mt-2', itemClass: 'pt-2' },
              },
            },
            widths: {
              '1/2': 'w-1/2',
              '1/3': 'w-1/3',
            },
            responsiveWidthGenerator(breakpoint, width) {
              return `${breakpoint}:${width}`;
            },
          },
        },
      },
    };
  });

  it('should apply containerClass', () => {
    const wrapper = mount(CFlex, {
      localVue,
    });
    expect(wrapper.html()).toBe(`<div class="flex"></div>`);
  });

  it('should apply itemClass to all items', () => {
    localVue.prototype.$chusho.options.components.flex.itemClass = 'flex-item';

    const wrapper = mount(CFlex, {
      localVue,
      stubs: {
        CFlexItem,
      },
      slots: {
        default: ['<CFlexItem>1</CFlexItem>'],
      },
    });
    expect(wrapper.findComponent(CFlexItem).html()).toBe(
      `<div class="flex-item">1</div>`
    );
  });

  it('should apply single gap on both axis', () => {
    const wrapper = mount(CFlex, {
      localVue,
      propsData: {
        gap: '1',
      },
      stubs: {
        CFlexItem,
      },
      slots: {
        default: ['<CFlexItem>1</CFlexItem>'],
      },
    });
    expect(wrapper.html()).toBe(
      `<div class="flex -ml-1 -mt-1">
  <div class="pl-1 pt-1">1</div>
</div>`
    );
  });

  it('should apply multiple gaps on respective axis', () => {
    const wrapper = mount(CFlex, {
      localVue,
      propsData: {
        gap: ['1', '2'],
      },
      stubs: {
        CFlexItem,
      },
      slots: {
        default: ['<CFlexItem>1</CFlexItem>'],
      },
    });
    expect(wrapper.html()).toBe(
      `<div class="flex -ml-1 -mt-2">
  <div class="pl-1 pt-2">1</div>
</div>`
    );
  });

  it('should apply single width to items', () => {
    const wrapper = mount(CFlex, {
      localVue,
      stubs: {
        CFlexItem,
      },
      slots: {
        default: ['<CFlexItem width="1/2">1</CFlexItem>'],
      },
    });
    expect(wrapper.findComponent(CFlexItem).html()).toBe(
      `<div class="w-1/2">1</div>`
    );
  });

  it('should apply multiple widths to items', () => {
    const wrapper = mount(CFlex, {
      localVue,
      stubs: {
        CFlexItem,
      },
      slots: {
        default: [
          `<CFlexItem :width="{ default: '1/2', md: '1/3' }">1</CFlexItem>`,
        ],
      },
    });
    expect(wrapper.findComponent(CFlexItem).html()).toBe(
      `<div class="w-1/2 md:w-1/3">1</div>`
    );
  });

  it('should apply defaultWidth to all items without width', () => {
    localVue.prototype.$chusho.options.components.flex.defaultWidth = 'w-full';

    const wrapper = mount(CFlex, {
      localVue,
      stubs: {
        CFlexItem,
      },
      slots: {
        default: [
          '<CFlexItem width="1/2">1</CFlexItem>',
          '<CFlexItem>2</CFlexItem>',
        ],
      },
    });
    const items = wrapper.findAllComponents(CFlexItem);

    expect(items.at(0).html()).toBe(`<div class="w-1/2">1</div>`);
    expect(items.at(1).html()).toBe(`<div class="w-full">2</div>`);
  });
});
