import { addParameters, addDecorator } from '@storybook/vue';
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
import { withA11y } from '@storybook/addon-a11y';

import _ from 'lodash';
import React from 'react';
import toReact from '@egoist/vue-to-react';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

import Chusho from '@/chusho';

import chushoPresetTailwind from '../../../preset-tailwind/index.ts';
import tailwindConfig from '../../tailwind.config';
import '@/assets/tailwind.css';

/**
 * Customize Storybook
 */

addParameters({
  options: {
    showRoots: true,
  },
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
addDecorator(withA11y);

/**
 * Configure Vue global behavior within Storybook
 */

Vue.use(VueCompositionApi);

const config = _.merge(chushoPresetTailwind(tailwindConfig), {
  components: {
    btn: {
      defaultClass: 'inline-block',
      variants: {
        default: 'bg-blue-200 text-blue-900 rounded',
        medium: 'py-2 px-4',
      },
      disabledClass: 'cursor-not-allowed opacity-50',
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
    tabs: {
      tabsClass: 'tabs',
      tabListClass: 'flex mx-4',
      tabPanelsClass: 'py-3 px-4 bg-gray-200 rounded',
      tabPanelClass: 'tabpanel',
      tabClass(active) {
        return [
          'inline-block py-2 px-5 border-b-2 border-transparent',
          {
            'text-gray-700': !active,
            'text-blue-800 bg-blue-100 border-blue-300 rounded-t': active,
          },
        ];
      },
    },
  },
});

Vue.use(Chusho, config);
