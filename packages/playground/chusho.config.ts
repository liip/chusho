import { ChushoUserOptions } from 'chusho';

export default {
  components: {
    alert: {
      class({ variant }) {
        return [
          'py-3 px-6 rounded',
          {
            'bg-red-200 text-red-900': variant?.includes('error'),
            'inline-block': variant?.includes('inline'),
          },
        ];
      },
    },
    btn: {
      class({ variant, disabled }) {
        return {
          'bg-white text-blue-500': !variant,
          'bg-blue-500 text-white': variant?.includes('primary'),
          'inline-block py-3 px-5 font-bold shadow rounded':
            !variant || variant?.includes('primary'),
          'cursor-not-allowed opacity-50': disabled,
        };
      },
    },
    dialog: {
      class: 'dialog p-6 bg-white rounded shadow-lg',
      overlayClass:
        'dialog-overlay fixed inset-0 p-4 flex flex-columns items-center justify-center bg-black-50',
    },
    icon: {
      spriteUrl: '/icons.svg',
      width: 48,
      height: 48,
      class: 'inline-block align-middle pointer-events-none fill-current',
    },
    tabs: {
      class: 'tabs',
    },
    tabList: {
      class: 'flex mx-4',
    },
    tabPanels: {
      class: 'py-3 px-4 bg-gray-200 rounded',
    },
    tabPanel: {
      class: 'tabpanel',
    },
    tab: {
      class({ active }) {
        return [
          'inline-block py-2 px-5 border-b-2 border-transparent',
          {
            'text-gray-700': !active,
            'text-blue-800 bg-blue-100 border-blue-300 rounded-t': active,
          },
        ];
      },
    },
    toggleBtn: {
      inheritBtnClass: false,
      class({ active }) {
        return [
          'py-2 px-4 border-2 border-gray-500 rounded',
          {
            'shadow-inner bg-gray-200': active,
            'shadow-lg': !active,
          },
        ];
      },
    },
    toggleContent: {
      transition: {
        name: 'fade',
      },
      class() {
        return 'p-6 bg-gray-200 rounded mt-2';
      },
    },
  },
} as ChushoUserOptions;
