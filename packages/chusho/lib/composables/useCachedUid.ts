import { Ref, onMounted, readonly, ref } from 'vue';

import { isServer } from '../utils/ssr';
import uid from '../utils/uid';

const UID_CACHE_ATTR = 'data-chusho-ssr-uid';

export interface UseCachedUid {
  id: Readonly<Ref<string>>;
  cacheAttrs: {
    ref: Ref<HTMLElement | null>;
    [UID_CACHE_ATTR]?: string;
  };
}

/**
 * When using SSR, we cannot just generate a random ID as server and client values won’t match
 * The idea here is to store the server generated ID on a dom node (target) and restore it when mounting the component client side
 */
export default function useCachedUid(prefix?: string): UseCachedUid {
  const id = ref(uid(prefix));
  const cacheElement = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (cacheElement.value) {
      const serverId = cacheElement.value?.getAttribute(UID_CACHE_ATTR);

      if (serverId) {
        id.value = serverId;
      }
    }
  });

  return {
    id: readonly(id),
    cacheAttrs: {
      ref: cacheElement,
      [UID_CACHE_ATTR]: isServer ? id.value : undefined,
    },
  };
}
