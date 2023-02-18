import { defineConfig } from 'chusho';
import { normalizeClass } from 'vue';

function getBtnClass({
  variant,
  disabled,
}: {
  variant?: Record<string, boolean>;
  disabled?: unknown;
}) {
  const isPrimary = !variant;
  const isSecondary = variant?.secondary;

  return [
    'inline-flex',
    'items-center',
    'hover:no-underline',
    'transition-all duration-200 ease-out',
    {
      'py-3 px-5 font-medium rounded': isPrimary || isSecondary,
      'bg-gold-600 text-white': isPrimary,
      'bg-gray-100 text-gray-800': isSecondary,
      'focus:outline-none focus:ring ring-gold-400 focus:ring-offset-2':
        (isPrimary || isSecondary) && !disabled,
      'hover:bg-gold-500': isPrimary && !disabled,
      'hover:bg-gray-200 hover:text-gray-800': isSecondary && !disabled,
      'bg-transparent text-gold-600 underline hover:no-underline':
        variant?.link,
      'opacity-75 cursor-not-allowed': disabled,
    },
  ];
}

function getFieldsClass() {
  return 'block w-full bg-white px-4 py-3 border border-gray-400 rounded outline-none focus:border-gold-600 focus:ring ring-gold-400';
}

export default defineConfig({
  components: {
    alert: {
      class({ variant }) {
        return [
          'block py-3 px-5 rounded border-l-4',
          {
            'bg-red-100 text-red-700 border-red-300': variant?.error,
            'bg-gold-100 text-gold-700 border-gold-300': variant?.warning,
            'bg-green-100 text-green-700 border-green-300': variant?.success,
            'bg-blue-100 text-blue-700 border-blue-300': variant?.info,
          },
        ];
      },
    },

    btn: {
      class: getBtnClass,
    },

    checkbox: {
      class({ variant, checked }) {
        return [
          'appearance-none inline-block w-3 h-3 rounded-sm border-2 border-white ring-2 ring-gray-500',
          { 'mr-3': variant?.inline },
          { 'bg-white': !checked },
          { 'bg-gold-500': checked },
        ];
      },
    },

    collapse: {
      class({ variant }) {
        return {
          'relative w-full flex-shrink-0': variant?.panel,
        };
      },
    },

    collapseBtn: {
      class({ variant, active }) {
        return {
          'flex items-center justify-between w-full px-5 py-3 text-left font-medium text-indigo-800 rounded-t-md bg-indigo-100 hover:bg-indigo-200 focus:bg-indigo-200 transition-all duration-200 ease-out':
            variant?.panel,
          'rounded-b-md': variant?.panel && !active,
        };
      },
    },

    collapseContent: {
      class({ variant }) {
        return {
          'absolute z-10 w-full px-5 py-4 text-gray-700 bg-white border-b border-gray-200 rounded-b-md':
            variant?.panel,
        };
      },
    },

    dialog: {
      overlayClass({ variant }) {
        return [
          'p-8 flex flex-columns items-center justify-center backdrop-blur',
          { 'fixed inset-0 z-20': !variant?.relative },
        ];
      },
      class({ variant }) {
        return [
          'dialog max-w-md bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden',
          {
            'p-5': variant?.spaced,
          },
        ];
      },
    },

    icon: {
      spriteUrl: '/icons.svg',
      class:
        'inline-block align-middle flex-shrink-0 fill-current stroke-current',
    },

    label: {
      class({ variant }) {
        return [
          'cursor-pointer',
          {
            'block mb-1 font-bold': !variant,
            'inline-flex items-center': variant?.inline,
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
          'relative px-6 py-3 list-none',
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
        'absolute top-full left-0 z-10 mt-1 py-2 px-0 w-max max-w-sm bg-white border border-gray-100 rounded shadow-md',
    },

    menuSeparator: {
      class: 'my-2 h-px bg-gray-200 list-none',
    },

    picture: {
      class: 'block h-auto rounded-2xl',
    },

    radio: {
      class({ variant, checked }) {
        return [
          'appearance-none inline-block w-3 h-3 rounded-full border-2 border-white ring-2 ring-gray-500',
          { 'mr-3': variant?.inline },
          { 'bg-white': !checked },
          { 'bg-gold-500': checked },
        ];
      },
    },

    select: {
      class: 'inline-block relative',
    },

    selectBtn: {
      class:
        'inline-block w-56 flex justify-between py-2 px-4 border border-gray-400 bg-gray-100 rounded',
    },

    selectOptions: {
      class:
        'absolute top-full left-0 z-20 min-w-full max-h-56 overflow-y-auto pl-0 mt-1 bg-gray-50 border border-gray-300 rounded shadow-md',
    },

    selectOption: {
      class({ selected, disabled }) {
        return [
          'list-none relative pl-8 pr-4 leading-loose outline-none',
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

    tabList: {
      class: 'flex gap-6 mb-6 border-0 border-b border-gray-200',
    },

    tab: {
      class({ active }) {
        return [
          'inline-block border-0 text-base cursor-pointer bg-transparent',
          'whitespace-nowrap pb-3 border-b-2 font-medium -mb-px transition-colors duration-200 ease-out',
          active
            ? 'border-gold-600 text-gold-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        ];
      },
    },

    textarea: {
      class: () => normalizeClass([getFieldsClass(), 'h-32 leading-6']),
    },

    textField: {
      class: () => normalizeClass([getFieldsClass(), 'leading-4']),
    },
  },
});
