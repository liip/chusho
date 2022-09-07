import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';

import { withSetup } from '../../test/utils';

import usePopup, { PopupType } from './usePopup';

describe('usePopup', () => {
  it('has a unique ID', () => {
    const { composable } = withSetup(() => usePopup());

    expect(composable.uid.id.value).toBe('chusho-popup-0');
  });

  it('is of type menu by default', () => {
    const { composable } = withSetup(() => usePopup());

    expect(composable.type).toBe('menu');
  });

  it('accepts a custom type', () => {
    const { composable } = withSetup(() =>
      usePopup({
        type: PopupType.dialog,
      })
    );

    expect(composable.type).toBe('dialog');
  });

  it('provides attributes for the element', () => {
    const { composable } = withSetup(() => usePopup());

    expect(composable.attrs).toMatchObject({
      'data-chusho-ssr-uid': undefined,
      ref: expect.any(Object),
    });
  });

  it('is collapsed by default and expandable', () => {
    const { composable } = withSetup(() => usePopup());

    expect(composable.expanded.value).toBe(false);
    composable.expand();
    expect(composable.expanded.value).toBe(true);
  });

  it('can be expanded by default and collapsed', () => {
    const { composable } = withSetup(() =>
      usePopup({
        expanded: true,
      })
    );

    expect(composable.expanded.value).toBe(true);
    composable.collapse();
    expect(composable.expanded.value).toBe(false);
  });

  it('is togglabe', () => {
    const { composable } = withSetup(() => usePopup());

    composable.toggle();
    expect(composable.expanded.value).toBe(true);
    composable.toggle();
    expect(composable.expanded.value).toBe(false);
  });

  it('updates if expanded option is a ref and changes', async () => {
    const options = {
      expanded: ref(false),
    };
    const { composable } = withSetup(() => usePopup(options));

    expect(composable.expanded.value).toBe(false);

    options.expanded.value = true;

    expect(composable.expanded.value).toBe(true);
  });

  it('updates if expanded prop change', async () => {
    const options = {
      expanded: false,
      expandedPropName: 'open',
    };
    const { composable, wrapper } = withSetup(() => usePopup(options), {
      props: {
        open: Boolean,
      },
    });

    await wrapper.setProps({ open: true });

    expect(composable.expanded.value).toBe(true);
  });

  it('can be disabled by default', () => {
    const { composable } = withSetup(() =>
      usePopup({
        disabled: true,
      })
    );

    expect(composable.disabled.value).toBe(true);
  });

  it('updates if disabled option is a ref and changes', async () => {
    const options = {
      disabled: ref(false),
    };
    const { composable } = withSetup(() => usePopup(options));

    expect(composable.disabled.value).toBe(false);

    options.disabled.value = true;

    expect(composable.disabled.value).toBe(true);
  });

  it('updates if disabled prop change', async () => {
    const options = {
      disabled: false,
      disabledPropName: 'disabled',
    };
    const { composable, wrapper } = withSetup(() => usePopup(options), {
      props: {
        disabled: Boolean,
      },
    });

    await wrapper.setProps({ disabled: true });

    expect(composable.disabled.value).toBe(true);
  });

  it('doesn’t render the popup if its not expanded', () => {
    const { composable } = withSetup(() => usePopup());

    const render = vi.fn();
    composable.renderPopup(render);

    expect(render).not.toHaveBeenCalled();
  });

  it('renders the popup when its expanded with clickOutside directive when closeOnClickOutside option is true', async () => {
    const render = vi.fn(() => h('div'));
    let popup = null;
    mount({
      setup() {
        popup = usePopup({
          closeOnClickOutside: true,
          expanded: true,
        });

        return () => popup.renderPopup(render);
      },
    });

    expect(render).toHaveBeenCalled();
    expect(popup.expanded.value).toBe(true);

    document.body.click();
    await nextTick();

    expect(popup.expanded.value).toBe(false);
  });

  it('renders the popup when its expanded without clickOutside directive when closeOnClickOutside option is false', async () => {
    const render = vi.fn(() => h('div'));
    let popup = null;
    mount({
      setup() {
        popup = usePopup({
          closeOnClickOutside: false,
          expanded: true,
        });

        return () => popup.renderPopup(render);
      },
    });

    expect(render).toHaveBeenCalled();
    expect(popup.expanded.value).toBe(true);

    document.body.click();
    await nextTick();

    expect(popup.expanded.value).toBe(true);
  });
});
