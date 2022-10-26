import { mergeProps } from 'vue';

import { VueClassBinding } from '../lib/types';

import { defineConfig } from '../lib/chusho';

function getBtnClass({
  variant,
  disabled,
}: {
  variant?: string | unknown[];
  disabled?: boolean;
}): VueClassBinding {
  return {
    'bg-white text-blue-500': !variant,
    'bg-blue-500 text-white': variant?.includes('primary'),
    'inline-block py-3 px-5 font-bold shadow rounded':
      !variant || variant?.includes('primary'),
    'cursor-not-allowed opacity-50': disabled,
  };
}

function getFieldClass({ disabled }: { disabled?: boolean }): VueClassBinding {
  return [
    'block w-full bg-white px-4 py-3 border border-gray-400 rounded outline-none focus:border-accent-600 focus:ring ring-accent-400',
    disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white',
  ];
}

export default defineConfig({
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
      class: getBtnClass,
    },

    checkbox: {
      class({ variant, checked, disabled }) {
        return [
          'appearance-none inline-block w-3 h-3 rounded-sm border-2 border-white ring-2',
          { 'mr-3': variant?.includes('inline') },
          checked ? 'bg-accent-500' : 'bg-white',
          disabled ? 'ring-gray-300' : 'ring-gray-500',
        ];
      },
    },

    collapseBtn: {
      class({ active }) {
        return [
          'py-2 px-4 border-2 border-gray-400 rounded',
          {
            'shadow-inner bg-gray-100': active,
            'shadow-lg': !active,
          },
        ];
      },
    },

    collapseContent: {
      transition: {
        name: 'fade',
      },
      class: 'p-6 bg-gray-100 rounded mt-2',
    },

    dialog: {
      class: 'dialog p-6 bg-white rounded shadow-lg',
      overlayClass:
        'dialog-overlay fixed inset-0 p-4 flex flex-columns items-center justify-center bg-gray-900 bg-opacity-75',
    },

    formGroup: {
      as: 'div',
      class: 'flex flex-col gap-1',
    },

    icon: {
      spriteUrl: '/icons.svg',
      width: 48,
      height: 48,
      class: 'inline-block align-middle pointer-events-none fill-current',
    },

    label: {
      class({ variant }) {
        return [
          'cursor-pointer',
          {
            'block mb-1 font-bold': !variant,
            'inline-flex items-center': variant?.includes('inline'),
          },
        ];
      },
    },

    menu: {
      class: 'inline-block relative',
    },

    menuBtn: {
      class: getBtnClass,
    },

    menuItem: {
      class: ({ disabled, role, selected }) => {
        return [
          'relative px-6 py-3',
          {
            'cursor-pointer hover:bg-gray-100 focus-visible:bg-gray-100':
              !disabled,
            'text-gray-400 cursor-not-allowed': disabled,
            'pl-12': ['menuitemcheckbox', 'menuitemradio'].includes(role),
            'before:content-[""] before:absolute before:left-4 before:top-4 before:border-2 before:border-gray-300 before:w-4 before:h-4 before:transition-colors after:content-[""] after:absolute after:left-5 after:top-5 after:w-2 after:h-2 after:bg-gray-600 after:scale-0 after:transition-transform':
              ['menuitemcheckbox', 'menuitemradio'].includes(role),
            'before:rounded-[50%] after:rounded-[50%]':
              role === 'menuitemradio',
            'before:border-gray-600 after:scale-100':
              ['menuitemcheckbox', 'menuitemradio'].includes(role) && selected,
          },
        ];
      },
    },

    menuLink: {
      class: ({ disabled }) => [
        'block w-full px-6 py-3',
        {
          'cursor-pointer hover:bg-gray-100 focus-visible:bg-gray-100':
            !disabled,
          'text-gray-400 cursor-not-allowed': disabled,
        },
      ],
    },

    menuList: {
      transition: {
        name: 'appear',
      },
      class:
        'absolute top-full left-0 mt-1 py-2 w-max max-w-sm bg-white border border-gray-100 rounded shadow-md',
    },

    menuSeparator: {
      class: 'my-2 h-px bg-gray-200',
    },

    picture: {
      class: 'picture',
    },

    radio: {
      class({ variant, checked }) {
        return [
          'appearance-none inline-block w-3 h-3 rounded-full border-2 border-white ring-2 ring-gray-500',
          { 'mr-3': variant?.includes('inline') },
          { 'bg-white': !checked },
          { 'bg-accent-500': checked },
        ];
      },
    },

    select: {
      class: 'inline-block relative',
    },

    selectBtn: {
      class: ({ disabled }) => {
        return [
          'w-56 flex justify-between py-2 px-4 border border-gray-400 bg-gray-100 rounded',
          { 'cursor-not-allowed opacity-50': disabled },
        ];
      },
    },

    selectOptions: {
      class:
        'absolute top-full left-0 min-w-full max-h-56 overflow-y-auto mt-1 bg-gray-50 border border-gray-300 rounded shadow-md',
    },

    selectOption: {
      class({ selected, disabled }) {
        return [
          'relative pl-8 pr-4 leading-loose outline-none',
          {
            'hover:text-blue-700 focus:text-blue-700 hover:bg-blue-100 focus:bg-blue-100 cursor-pointer':
              !disabled,
            'text-gray-400': disabled,
            'text-blue-800': selected,
          },
        ];
      },
    },

    selectGroupLabel: {
      class: 'relative px-4 leading-loose font-bold',
    },

    tabs: {
      class: 'tabs',
    },

    tabList: {
      class: 'flex mx-4',
    },

    tabPanels: {
      class: 'py-3 px-4 bg-gray-100 rounded',
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
            'text-blue-700 bg-blue-50 border-blue-200 rounded-t': active,
          },
        ];
      },
    },

    textarea: {
      class: (props) =>
        mergeProps(
          { class: getFieldClass(props) },
          {
            class: 'h-48 leading-6',
          }
        ),
    },

    textField: {
      class: (props) =>
        mergeProps(
          { class: getFieldClass(props) },
          {
            class: 'leading-4',
          }
        ),
    },
  },
});
