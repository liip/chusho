import { ClassGenerator, VueClassBinding } from '../types';

export function generateConfigClass(
  configClass?: VueClassBinding | ClassGenerator,
  ctx?: Record<string, unknown>
): Record<string, unknown> {
  if (configClass && !ctx?.bare) {
    return {
      class: typeof configClass === 'function' ? configClass(ctx) : configClass,
    };
  }
  return {};
}
