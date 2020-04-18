import CompositionApi from '@vue/composition-api';
import Chusho from 'chusho';

import './assets/extras.scss';

export default ({ Vue }) => {
  Vue.use(CompositionApi);
  Vue.use(Chusho, {
    components: {
      btn: {
        defaultClass: 'btn',
        variants: {
          default: 'btn--default',
          medium: 'btn--medium',
        },
      },
      flex: {
        containerClass: 'flex flex-wrap',
        gaps: {
          x: {
            '1': { containerClass: '-ml-1', itemClass: 'pl-1' },
            '2': { containerClass: '-ml-2', itemClass: 'pl-2' },
            '3': { containerClass: '-ml-3', itemClass: 'pl-3' },
            '4': { containerClass: '-ml-4', itemClass: 'pl-4' },
            '5': { containerClass: '-ml-5', itemClass: 'pl-5' },
            '6': { containerClass: '-ml-6', itemClass: 'pl-6' },
            '7': { containerClass: '-ml-7', itemClass: 'pl-7' },
            '8': { containerClass: '-ml-8', itemClass: 'pl-8' },
          },
          y: {
            '1': { containerClass: '-mt-1', itemClass: 'pt-1' },
            '2': { containerClass: '-mt-2', itemClass: 'pt-2' },
            '3': { containerClass: '-mt-3', itemClass: 'pt-3' },
            '4': { containerClass: '-mt-4', itemClass: 'pt-4' },
            '5': { containerClass: '-mt-5', itemClass: 'pt-5' },
            '6': { containerClass: '-mt-6', itemClass: 'pt-6' },
            '7': { containerClass: '-mt-7', itemClass: 'pt-7' },
            '8': { containerClass: '-mt-8', itemClass: 'pt-8' },
          },
        },
        defaultWidth: 'w-full',
        widths: {
          auto: 'w-auto',
          full: 'w-full',
          '1/2': 'w-1/2',
          '1/3': 'w-1/3',
          '2/3': 'w-2/3',
        },
      },
      icon: {
        spriteUrl: '/icons.svg',
        width: 48,
        height: 48,
        class: 'icon',
      },
      tabs: {
        tabsClass: 'tabs',
        tabListClass: 'tablist',
        tabClass(active) {
          return [
            'tab btn',
            {
              'is-active': active,
            },
          ];
        },
      },
      dialog: {
        overlayClass: 'dialog-overlay',
        dialogClass: 'dialog',
      },
    },
  });
};
