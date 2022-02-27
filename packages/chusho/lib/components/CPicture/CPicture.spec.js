import { mount } from '@vue/test-utils';

import CPicture from './CPicture';

describe('CPicture', () => {
  it('renders with the right attributes', () => {
    const wrapper = mount(CPicture, {
      props: {
        src: '/image.jpg',
        alt: 'alt',
      },
    });

    expect(wrapper.html()).toBe(
      '<picture><img src="/image.jpg" alt="alt"></picture>'
    );
  });

  it('renders an empty alt by default', () => {
    const wrapper = mount(CPicture, {
      props: {
        src: '/image.jpg',
      },
    });

    expect(wrapper.html()).toBe(
      '<picture><img src="/image.jpg" alt=""></picture>'
    );
  });

  it('apply config class on img tag', () => {
    const wrapper = mount(CPicture, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                picture: {
                  class: 'picture',
                },
              },
            },
          },
        },
      },
      props: {
        src: '/image.jpg',
        class: 'special-picture',
      },
    });

    expect(wrapper.find('img').classes()).toEqual([
      'special-picture',
      'picture',
    ]);
  });

  it('renders given sources', () => {
    const wrapper = mount(CPicture, {
      props: {
        src: '/image.jpg',
        sources: [
          {
            srcset: 'image@2x.webp 2x, image.webp',
            type: 'image/webp',
          },
          {
            srcset: 'image@2x.jpg 2x, image.jpg',
            type: 'image/jpeg',
          },
        ],
      },
    });

    expect(wrapper.html()).toBe(
      `<picture>
  <source srcset="image@2x.webp 2x, image.webp" type="image/webp">
  <source srcset="image@2x.jpg 2x, image.jpg" type="image/jpeg"><img src="/image.jpg" alt="">
</picture>`
    );
  });
});
