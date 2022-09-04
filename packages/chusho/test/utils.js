import { mount } from '@vue/test-utils';

/**
 * Wrap a composable into a component setup
 * Required for composables using lifecycle hooks
 */
export function withSetup(composableFn, options = {}) {
  let composable;

  const wrapper = mount({
    ...options,

    setup() {
      composable = composableFn();
      // Suppress missing template warning
      return () => {
        // noop
      };
    },
  });

  return { wrapper, composable };
}
