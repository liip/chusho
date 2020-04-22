import resolveConfig from 'tailwindcss/resolveConfig';
import { ChushoUserOptions } from 'chusho';

export default function chuchoPresetTailwind(
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  tailwindConfig: Record<string | number, any>
): ChushoUserOptions {
  const config = resolveConfig(tailwindConfig);
  const { theme } = config;

  const preset: ChushoUserOptions = {
    components: {
      flex: {
        containerClass: 'flex flex-wrap',
        defaultWidth: 'w-full',
        widths: {},
        gaps: {
          x: {},
          y: {},
        },
      },
    },
  };

  /**
   * Gaps
   */
  Object.keys(theme.spacing).forEach(function (spacing: string): void {
    preset.components!.flex!.gaps!.x![spacing] = {
      containerClass: `-ml-${spacing}`,
      itemClass: `pl-${spacing}`,
    };
    preset.components!.flex!.gaps!.y![spacing] = {
      containerClass: `-mt-${spacing}`,
      itemClass: `pt-${spacing}`,
    };
  });

  /**
   * Widths
   */
  Object.keys(theme.width).forEach(function (width) {
    preset.components!.flex!.widths![width] = `w-${width}`;
  });

  return preset;
}
