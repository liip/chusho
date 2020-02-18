import { addParameters } from '@storybook/vue';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Props,
  Stories,
} from '@storybook/addon-docs/blocks';
import ComponentConfig from './blocks/ComponentConfig';
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
    page: () => [
      React.createElement(Title, { key: 'title' }),
      React.createElement(Subtitle, { key: 'subtitle' }),
      React.createElement(Description, { key: 'description' }),
      React.createElement(Primary, { key: 'primary' }),
      React.createElement(ComponentConfig, { key: 'componentConfig' }),
      React.createElement(Props, { key: 'props' }),
      React.createElement(Stories, { key: 'stories' }),
    ],
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
  stack: {
    gaps: {
      1: {
        containerClass: '-mt-1',
        itemClass: 'mt-1',
      },
      2: {
        containerClass: '-mt-2',
        itemClass: 'mt-2',
      },
    },
  },
});
