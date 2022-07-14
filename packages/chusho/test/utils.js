import { mount } from '@vue/test-utils';

/**
 * Wrap a composable into a component setup
 * Required for composables using lifecycle hooks
 */
export function withSetup(composable) {
  let result;
  mount({
    setup() {
      result = composable();
      // Suppress missing template warning
      return () => {
        // noop
      };
    },
  });
  return result;
}
