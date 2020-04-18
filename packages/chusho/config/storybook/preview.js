import { addDecorator } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';

import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Chusho, { utils } from '@/chusho';

import chushoPresetTailwind from '../../../preset-tailwind/index.ts';
import tailwindConfig from '../../tailwind.config';
import '@/assets/tailwind.css';

/**
 * Customize Storybook
 */

addDecorator(withA11y);

/**
 * Configure Vue global behavior within Storybook
 */

Vue.use(VueCompositionApi);

const config = utils.mergeDeep(chushoPresetTailwind(tailwindConfig), {
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
    dialog: {
      overlayClass:
        'dialog-overlay fixed inset-0 p-4 flex flex-columns items-center justify-center bg-black-50',
      dialogClass: 'p-6 bg-white rounded shadow-lg',
    },
  },
});

Vue.use(Chusho, config);
