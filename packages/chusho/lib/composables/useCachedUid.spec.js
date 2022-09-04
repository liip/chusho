import { mount } from '@vue/test-utils';
import { h } from 'vue';

import { withSetup } from '../../test/utils';

import useCachedUid from './useCachedUid';

describe('useCachedUid', () => {
  it('returns a unique ID without prefix', () => {
    const { composable } = withSetup(() => useCachedUid());

    expect(composable.id.value).toBe('0');
  });

  it('returns a unique ID with prefix', () => {
    const { composable } = withSetup(() => useCachedUid('chusho'));

    expect(composable.id.value).toBe('chusho-0');
  });

  it('returns a ref and data-attribute for caching', () => {
    const { composable } = withSetup(() => useCachedUid('chusho'));

    expect(composable.cacheAttrs).toMatchInlineSnapshot(`
      {
        "data-chusho-ssr-uid": undefined,
        "ref": RefImpl {
          "__v_isRef": true,
          "__v_isShallow": false,
          "_rawValue": null,
          "_value": null,
          "dep": undefined,
        },
      }
    `);
  });

  it('set the uid based on the ref caching attribute on mount', () => {
    let uid = null;

    mount({
      setup() {
        uid = useCachedUid();
        return {
          uid,
        };
      },
      render() {
        return h('div', {
          ...this.uid.cacheAttrs,
          'data-chusho-ssr-uid': 'ssr-id',
        });
      },
    });

    expect(uid.id.value).toEqual('ssr-id');
  });
});
