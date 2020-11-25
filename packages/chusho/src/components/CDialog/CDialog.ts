import {
  h,
  VNode,
  defineComponent,
  Teleport,
  Transition,
  nextTick,
  TransitionProps,
  PropType,
  mergeProps,
  inject,
} from 'vue';

import { isPlainObject } from '../../utils/objects';
import { getFocusableElements } from '../../utils/keyboard';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixin';
import { DollarChusho } from '../../types';
import {
  createPortalIfNotExists,
  PORTAL_ID,
  preventAccessToPageContent,
  releaseAccessToPageContent,
} from './utils';

const KEY_TAB = 9;
const KEY_ESC = 27;

export interface Data {
  active: boolean;
  savedActiveElement: null | HTMLElement;
  focusableElements: Array<HTMLElement>;
}

export default defineComponent({
  name: 'CDialog',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * Define if the dialog should be visible or not
     */
    modelValue: {
      type: Boolean,
      required: true,
    },

    /**
     * The object can contain any Vue built-in [transition component props](https://v3.vuejs.org/api/built-in-components.html#transition).
     *
     * For example: `{ name: "fade", mode: "out-in" }`.
     *
     * If you defined a default transition in the config and want to disable it, use `false`.
     */
    transition: {
      type: [Object, Boolean] as PropType<TransitionProps | false>,
      default: null,
    },

    /**
     * Attributes to be applied to the overlay element.
     *
     * For example: `{ class: 'custom-overlay', id: 'gallery-modal'  }`
     */
    overlay: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },

  emits: ['update:modelValue'],

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);

    return {
      chusho,
    };
  },

  data(): Data {
    return {
      active: false,
      savedActiveElement: null,
      focusableElements: [],
    };
  },

  computed: {
    firstFocusableEl(): HTMLElement | undefined {
      return this.focusableElements[0];
    },

    lastFocusableEl(): HTMLElement | undefined {
      return this.focusableElements[this.focusableElements.length - 1];
    },

    dialogElement(): HTMLElement | undefined {
      return this.$refs.dialogElement as HTMLElement | undefined;
    },
  },

  updated() {
    if (this.dialogElement) {
      this.focusableElements = getFocusableElements(this.dialogElement);
    }
  },

  methods: {
    activate(): void {
      if (this.active) return;

      this.active = true;
      this.savedActiveElement = document.activeElement as HTMLElement;

      // Store the dialog instance in a global array
      // This allow closing only the last one when pressing ESC and multiple dialogs are open
      this.chusho?.openDialogs.push(this);

      nextTick(() => {
        if (!this.dialogElement) return;

        this.focusableElements = getFocusableElements(this.dialogElement);
        this.firstFocusableEl?.focus();
        preventAccessToPageContent();
      });

      document.addEventListener('keydown', this.handleKeyDown);
    },

    deactivate(): void {
      if (!this.active) return;

      releaseAccessToPageContent();

      const index = this.chusho?.openDialogs.indexOf(this);
      if (index) {
        this.chusho?.openDialogs.splice(index, 1);
      }

      this.savedActiveElement?.focus();
      document.removeEventListener('keydown', this.handleKeyDown);
      this.active = false;
    },

    handleKeyDown(e: KeyboardEvent): void {
      console.log('key down', e);

      switch (e.keyCode) {
        case KEY_ESC:
          if (
            this ===
            this.chusho?.openDialogs[this.chusho.openDialogs.length - 1]
          ) {
            this.$emit('update:modelValue', false);
          }
          break;

        case KEY_TAB:
          if (this.focusableElements.length === 1) {
            e.preventDefault();
          } else if (e.shiftKey) {
            if (
              this.lastFocusableEl &&
              document.activeElement === this.firstFocusableEl
            ) {
              e.preventDefault();
              this.lastFocusableEl.focus();
            }
          } else {
            if (
              this.firstFocusableEl &&
              document.activeElement === this.lastFocusableEl
            ) {
              e.preventDefault();
              this.firstFocusableEl.focus();
            }
          }
          break;
      }
    },

    renderChildren() {
      const dialogConfig = this.chusho?.options?.components?.dialog;
      const children: VNode[] = [];

      if (this.modelValue) {
        const overlayProps: Record<string, unknown> = mergeProps(this.overlay, {
          tabindex: '-1',
          onClick: (e: KeyboardEvent) => {
            if (e.target !== e.currentTarget) return;
            this.$emit('update:modelValue', false);
          },
          ...generateConfigClass(dialogConfig?.overlayClass, this.$props),
        });

        const dialogProps = mergeProps(this.$attrs, {
          role: 'dialog',
          ref: 'dialogElement',
          ...generateConfigClass(dialogConfig?.class, this.$props),
        });

        children.push(
          h('div', overlayProps, h('div', dialogProps, this.$slots))
        );

        nextTick(this.activate);
      } else {
        nextTick(this.deactivate);
      }

      return children;
    },
  },

  render() {
    const dialogConfig = this.chusho?.options?.components?.dialog;
    let transitionProps: TransitionProps | null = null;

    createPortalIfNotExists();

    if (isPlainObject(this.transition)) {
      transitionProps = this.transition;
    } else if (
      this.transition !== false &&
      dialogConfig &&
      dialogConfig.transition
    ) {
      transitionProps = dialogConfig.transition;
    }

    return h(
      Teleport,
      {
        to: `#${PORTAL_ID}`,
      },
      transitionProps
        ? h(Transition, transitionProps, { default: this.renderChildren })
        : this.renderChildren()
    );
  },
});
