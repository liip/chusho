import { mergeProps } from 'vue';

const fields = {
  class:
    'block w-full bg-white px-4 py-3 border border-gray-400 rounded outline-none focus:border-accent-600 focus:ring ring-accent-400',
};

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

    checkbox: {
      class({ variant, checked }) {
        return [
          'appearance-none inline-block w-3 h-3 rounded-sm border-2 border-white ring-2 ring-gray-500',
          { 'mr-3': variant?.includes('inline') },
          { 'bg-white': !checked },
          { 'bg-accent-500': checked },
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
      class({ active, disabled }) {
        return [
          'relative pl-8 pr-4 leading-loose outline-none',
          {
            'hover:text-blue-700 focus:text-blue-700 hover:bg-blue-100 focus:bg-blue-100 cursor-pointer':
              !disabled,
            'text-gray-400': disabled,
            'text-blue-800': active,
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

    textarea: mergeProps(fields, {
      class: 'h-48 leading-6',
    }),

    textField: mergeProps(fields, {
      class: 'leading-4',
    }),
  },
};
