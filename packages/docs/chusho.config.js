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
          'block py-3 px-5 rounded border-l-4',
          {
            'bg-red-100 text-red-700 border-red-300': variant === 'error',
            'bg-accent-100 text-accent-700 border-accent-300':
              variant === 'warning',
            'bg-green-100 text-green-700 border-green-300':
              variant === 'success',
            'bg-blue-100 text-blue-700 border-blue-300': variant === 'info',
          },
        ];
      },
    },

    btn: {
      class({ variant, disabled }) {
        return [
          'inline-block',
          'hover:no-underline',
          'transition-all duration-200 ease-out',
          {
            'py-3 px-5 rounded': !variant || variant === 'secondary',
            'bg-accent-600 text-white': !variant,
            'hover:bg-accent-500 focus:outline-none focus:ring ring-accent-400 focus:ring-offset-2':
              !variant && !disabled,
            'bg-gray-100 text-accent-600': variant === 'secondary',
            'hover:text-accent-500 focus:outline-none focus:ring ring-accent-400 focus:ring-offset-2':
              variant === 'secondary' && !disabled,
            'bg-transparent text-accent-600 underline hover:no-underline':
              variant === 'link',
            'opacity-75 cursor-not-allowed': disabled,
          },
        ];
      },
    },

    collapse: {
      class({ variant }) {
        return {
          'relative w-full': variant === 'panel',
        };
      },
    },

    collapseBtn: {
      class({ variant, active }) {
        return {
          'flex items-center justify-between w-full px-5 py-3 text-left font-medium text-indigo-800 rounded-t-md bg-indigo-100 hover:bg-indigo-200 focus:bg-indigo-200 transition-all duration-200 ease-out':
            variant === 'panel',
          'rounded-b-md': variant === 'panel' && !active,
        };
      },
    },

    collapseContent: {
      class({ variant }) {
        return {
          'absolute w-full px-5 py-4 text-gray-700 bg-white border-b border-gray-200 rounded-b-md':
            variant === 'panel',
        };
      },
    },

    dialog: {
      overlayClass({ variant }) {
        return [
          'p-8 flex flex-columns items-center justify-center bg-gray-700 bg-opacity-75',
          { 'fixed inset-0 z-20': !variant?.includes('relative') },
        ];
      },
      class({ variant }) {
        return [
          'dialog max-w-md bg-white rounded-lg shadow-lg overflow-hidden',
          {
            'p-5': variant?.includes('spaced'),
          },
        ];
      },
    },

    icon: {
      spriteUrl: '/icons.svg',
      class: 'inline-block align-middle fill-current stroke-current',
    },

    picture: {
      class: 'block h-auto rounded-2xl',
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
      class({ active, disabled }) {
        return [
          'list-none relative pl-8 pr-4 leading-loose outline-none',
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

    tabList: {
      class:
        'flex max-w-full overflow-x-auto overflow-y-hidden mb-6 space-x-6 border-0 border-b border-gray-200',
    },

    tab: {
      class({ active }) {
        return [
          'inline-block border-0 text-base cursor-pointer bg-transparent',
          'whitespace-nowrap pb-3 border-b-2 font-medium -mb-px transition-colors duration-200 ease-out',
          active
            ? 'border-accent-600 text-accent-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        ];
      },
    },

    textarea: mergeProps(fields, {
      class: 'h-32 leading-6',
    }),

    textField: mergeProps(fields, {
      class: 'leading-4',
    }),
  },
};
