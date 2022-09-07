import { mount } from '@vue/test-utils';
import { h } from 'vue';

import usePopup from './usePopup';
import usePopupTarget from './usePopupTarget';

let popup = null;
let composable = null;
const component = {
  setup() {
    popup = usePopup();

    return () =>
      h({
        setup() {
          composable = usePopupTarget();

          return {
            composable,
          };
        },

        render() {
          return h('div', {
            ...this.composable.attrs,
            ...this.composable.events,
          });
        },
      });
  },
};

describe('usePopupTarget', () => {
  it('provides id attribute with correct value', () => {
    mount(component);

    expect(composable.attrs.id).toBe('chusho-popup-0');
  });

  it.each(['Tab', 'Escape'])(
    'collapses the popup when pressing %s',
    async (key) => {
      const wrapper = mount(component);

      popup.expand();
      expect(popup.expanded.value).toBe(true);

      await wrapper.trigger('keydown', { key });
      expect(popup.expanded.value).toBe(false);
    }
  );
});
