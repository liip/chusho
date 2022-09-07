import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';

import usePopup from './usePopup';
import usePopupBtn from './usePopupBtn';

let popup = null;
let composable = null;
let disabled = ref(false);
const component = {
  setup() {
    popup = usePopup({
      disabled,
    });

    return () =>
      h({
        setup() {
          composable = usePopupBtn();

          return {
            composable,
          };
        },

        render() {
          return h('button', {
            ...this.composable.attrs,
            ...this.composable.events,
          });
        },
      });
  },
};

describe('usePopupBtn', () => {
  afterEach(() => {
    disabled.value = false;
  });

  it('provides aria-* and disabled attributes with correct values', () => {
    mount(component);

    expect(composable.attrs).toMatchInlineSnapshot(`
      {
        "aria-controls": "chusho-popup-0",
        "aria-expanded": "false",
        "aria-haspopup": "menu",
        "disabled": false,
      }
    `);
  });

  it('track changes in attributes', async () => {
    mount(component);

    popup.expand();
    await nextTick();
    expect(composable.attrs['aria-expanded']).toBe('true');

    disabled.value = true;
    await nextTick();
    expect(composable.attrs['disabled']).toBe(true);
  });

  it('toggles the popup on click', () => {
    const wrapper = mount(component);

    wrapper.find('button').trigger('click');
    expect(popup.expanded.value).toBe(true);

    wrapper.find('button').trigger('click');
    expect(popup.expanded.value).toBe(false);
  });

  it.each(['Tab', 'Escape'])(
    'collapses the popup when pressing %s',
    async (key) => {
      const wrapper = mount(component);

      popup.expand();
      expect(popup.expanded.value).toBe(true);

      await wrapper.find('button').trigger('keydown', { key });
      expect(popup.expanded.value).toBe(false);
    }
  );

  it.each([' ', 'Enter'])('toggles the popup when pressing %s', async (key) => {
    const wrapper = mount(component);

    await wrapper.find('button').trigger('keydown', { key });
    expect(popup.expanded.value).toBe(true);

    await wrapper.find('button').trigger('keydown', { key });
    expect(popup.expanded.value).toBe(false);
  });

  it.each(['ArrowDown', 'ArrowUp'])(
    'expand the popup when pressing %s and updates the triggerKey',
    async (key) => {
      const wrapper = mount(component);

      await wrapper.find('button').trigger('keydown', { key });
      expect(popup.expanded.value).toBe(true);
      expect(popup.triggerKey.value).toBe(key);
    }
  );
});
