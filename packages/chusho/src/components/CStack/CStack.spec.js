import { shallowMount } from '@vue/test-utils';
import CStack from './CStack';

describe('CStack', () => {
  it('wraps VNode and text but not whitespaces', () => {
    const wrapper = shallowMount(CStack, {
      mocks: {
        $chusho: {
          options: {
            components: {
              stack: {
                gaps: {
                  1: {
                    containerClass: 'container',
                    itemClass: 'item',
                  },
                },
              },
            },
          },
        },
      },
      context: {
        props: {
          gap: '1',
        },
        children: ['One', h => h('span', 'Two'), '  ', 'Three'],
      },
    });

    expect(wrapper.findAll('.container').length).toBe(1);
    expect(wrapper.findAll('.item').length).toBe(3);
  });
});
