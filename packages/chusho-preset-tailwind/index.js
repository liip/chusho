/* eslint-disable */
const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');

export default function(tailwindConfig) {
  const { theme } = resolveConfig(tailwindConfig);

  const preset = {
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
  Object.keys(theme.spacing).forEach(function(spacing) {
    preset.components.flex.gaps.x[spacing] = {
      containerClass: `-ml-${spacing}`,
      itemClass: `pl-${spacing}`,
    };
    preset.components.flex.gaps.y[spacing] = {
      containerClass: `-mt-${spacing}`,
      itemClass: `pt-${spacing}`,
    };
  });

  /**
   * Widths
   */
  Object.keys(theme.width).forEach(function(width) {
    preset.components.flex.widths[width] = `w-${width}`;
  });

  return preset;
}
