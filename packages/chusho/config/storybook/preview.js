import { addParameters } from '@storybook/vue';
import React from 'react';
import toReact from '@egoist/vue-to-react';
import Vue from 'vue';
import Chusho from '@/main.ts';

import '@/assets/tailwind.css';

/**
 * Customize Storybook
 */

addParameters({
  docs: {
    inlineStories: true,
    prepareForInline: storyFn => {
      const Story = toReact(storyFn());
      return React.createElement(Story);
    },
  },
});

/**
 * Configure Vue global behavior within Storybook
 */

Vue.use(Chusho, {
  btn: {
    default: 'inline-block py-2 px-4 bg-green-200 text-green-900 rounded',
    variants: {
      block: 'w-full',
      primary: 'bg-blue-200 text-blue-900',
      large: 'py-3 px-5 text-lg',
    },
    disabled: 'cursor-not-allowed opacity-75',
  },
});
