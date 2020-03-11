/* eslint-disable */
const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');

export default function(tailwindConfig) {
  const { theme } = resolveConfig(tailwindConfig);

  const preset = {
    components: {
      stack: {
        gaps: {},
      },
    },
  };

  /**
   * Stack
   */
  Object.keys(theme.spacing).forEach(function(spacing) {
    preset.components.stack.gaps[spacing] = {
      containerClass: `-mt-${spacing}`,
      itemClass: `mt-${spacing}`,
    };
  });

  return preset;
}
