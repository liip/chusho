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
import { Heading } from '@storybook/addon-docs/blocks';

import _ from 'lodash';
import React from 'react';
import toReact from '@egoist/vue-to-react';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Chusho from '@/main.ts';
import chushoPresetTailwind from '@chusho/preset-tailwind';
import tailwindConfig from '../../tailwind.config.js';

import '@/assets/tailwind.css';

/**
 * Customize Storybook
 */

addParameters({
  docs: {
    inlineStories: true,
    prepareForInline: (storyFn) => {
      const Story = toReact(storyFn());
      return React.createElement(Story);
    },
    page: () => [
      React.createElement(Title, { key: 'title' }),
      React.createElement(Subtitle, { key: 'subtitle' }),
      React.createElement(Description, { key: 'description' }),
      React.createElement(Primary, { key: 'primary' }),
      React.createElement(ComponentConfig, { key: 'componentConfig' }),
      React.createElement(Heading, { key: 'usage-title' }, 'Component usage'),
      React.createElement(Props, { key: 'props' }),
      React.createElement(Stories, { key: 'stories' }),
    ],
  },
});

/**
 * Configure Vue global behavior within Storybook
 */

Vue.use(VueCompositionApi);

const config = _.merge(chushoPresetTailwind(tailwindConfig), {
  components: {
    btn: {
      default: 'inline-block py-2 px-4 bg-green-200 text-green-900 rounded',
      variants: {
        block: 'w-full',
        primary: 'bg-blue-200 text-blue-900',
        large: 'py-3 px-5 text-lg',
      },
      disabledClass: 'cursor-not-allowed opacity-75',
    },
    icon: {
      spriteUrl: 'icons.svg',
      width: 48,
      height: 48,
      class: 'inline-block align-middle pointer-events-none fill-current',
    },
    toggle: {
      transition: {
        name: 'fade',
      },
    },
  },
});

Vue.use(Chusho, config);
