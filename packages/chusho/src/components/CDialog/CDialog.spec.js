import { mount } from '@vue/test-utils';

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
});
