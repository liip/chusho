import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import CDialog from './CDialog';

describe('CDialog', () => {
  let wrapper;

  afterEach(() => {
    wrapper?.unmount();
    const portal = document.querySelector('#chusho-dialogs-portal');
    if (portal) document.body.removeChild(portal);
  });

  it('renders teleported to the dialogs root', () => {
    wrapper = mount(CDialog, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.html()).toBe(`<!--teleport start-->
<!--teleport end-->`);
    expect(document.querySelector('#chusho-dialogs-portal').innerHTML).toBe(
      '<div tabindex="-1"><div role="dialog"></div></div>'
    );
  });

  it('renders the overlay and the dialog with the right attributes', () => {
    wrapper = mount(CDialog, {
      global: {
        provide: {
          $chusho: {
            openDialogs: [],
            options: {
              components: {
                dialog: {
                  class: 'dialog',
                  overlayClass: 'overlay',
                },
              },
            },
          },
        },
      },
      props: {
        modelValue: true,
        class: 'dialog-custom',
        overlay: {
          class: 'overlay-custom',
        },
      },
    });

    expect(document.querySelector('#chusho-dialogs-portal').innerHTML).toBe(
      '<div class="overlay-custom overlay" tabindex="-1"><div class="dialog-custom dialog" role="dialog"></div></div>'
    );
  });

  it('does not duplicate the dialogs root if it exists already', () => {
    const dialogsRoot = document.createElement('div');
    dialogsRoot.id = 'chusho-dialogs-portal';
    document.body.appendChild(dialogsRoot);

    wrapper = mount(CDialog, {
      props: {
        modelValue: true,
      },
    });

    const roots = document.querySelectorAll('#chusho-dialogs-portal');
    expect(roots.length).toBe(1);
    expect(roots[0]).toBe(dialogsRoot);
  });

  it('activates when shown and deactivates when hidden', async () => {
    const wrapper = mount(CDialog, {
      global: {
        provide: {
          $chusho: {
            openDialogs: [],
            options: { components: {} },
          },
        },
      },
      props: {
        modelValue: true,
      },
    });

    await nextTick();
    expect(wrapper.vm.active).toBe(true);

    await wrapper.setProps({ modelValue: false });
    await nextTick();
    expect(wrapper.vm.active).toBe(false);
  });

  it('prevents access to page content while open', async () => {
    const contentRoot = document.createElement('div');
    contentRoot.id = 'content-root';
    document.body.appendChild(contentRoot);

    // Simulate contentRoot being a visible element
    Object.defineProperty(contentRoot.__proto__, 'offsetParent', {
      get() {
        return this.parentNode;
      },
    });

    const dialogsRoot = document.createElement('div');
    dialogsRoot.id = 'chusho-dialogs-portal';
    document.body.appendChild(dialogsRoot);

    wrapper = mount(CDialog, {
      global: {
        provide: {
          $chusho: {
            openDialogs: [],
            options: { components: {} },
          },
        },
      },
      props: {
        modelValue: true,
      },
    });

    await nextTick();
    expect(contentRoot.getAttribute('aria-hidden')).toBe('true');
    expect(dialogsRoot.getAttribute('aria-hidden')).toBe(null);

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(contentRoot.getAttribute('aria-hidden')).toBe(null);
    expect(dialogsRoot.getAttribute('aria-hidden')).toBe(null);
  });
});
