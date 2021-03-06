import {
  h,
  VNode,
  defineComponent,
  Teleport,
  nextTick,
  PropType,
  mergeProps,
  inject,
} from 'vue';

import { getFocusableElements } from '../../utils/keyboard';
import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';
import { DollarChusho } from '../../types';
import {
  createPortalIfNotExists,
  PORTAL_ID,
  preventAccessToPageContent,
  releaseAccessToPageContent,
} from './utils';
import useActiveElement from '../../composables/useActiveElement';

export interface DialogData {
  active: boolean;
  focusableElements: Array<HTMLElement>;
}

export default defineComponent({
  name: 'CDialog',

  mixins: [componentMixin, transitionMixin],

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
      activeElement: useActiveElement(),
    };
  },

  data(): DialogData {
    return {
      active: false,
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
  },

  updated() {
    if (this.modelValue && this.active) {
      this.refreshFocusableElements();
    }
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },

  methods: {
    refreshFocusableElements(): void {
      if (this.$refs.dialogElement && this.modelValue) {
        this.focusableElements = getFocusableElements(
          this.$refs.dialogElement as HTMLElement
        );
      }
    },

    activate(): void {
      if (this.active) return;

      this.active = true;
      this.activeElement.save();

      // Store the dialog instance in a global array
      // This allow closing only the last one when pressing ESC and multiple dialogs are open
      this.chusho?.openDialogs.push(this);

      this.refreshFocusableElements();
      this.firstFocusableEl?.focus();
      preventAccessToPageContent();

      document.addEventListener('keydown', this.handleKeyDown);
    },

    deactivate(): void {
      if (!this.active) return;

      releaseAccessToPageContent();

      const index = this.chusho?.openDialogs.indexOf(this);
      if (index) {
        this.chusho?.openDialogs.splice(index, 1);
      }

      this.activeElement.restore();
      document.removeEventListener('keydown', this.handleKeyDown);
      this.active = false;
    },

    handleKeyDown(e: KeyboardEvent): void {
      switch (e.key) {
        case 'Esc':
        case 'Escape':
          if (
            this ===
            this.chusho?.openDialogs[this.chusho.openDialogs.length - 1]
          ) {
            this.$emit('update:modelValue', false);
          }
          break;

        case 'Tab':
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

    createPortalIfNotExists();

    return h(
      Teleport,
      {
        to: `#${PORTAL_ID}`,
      },
      [
        renderWithTransition(
          this.renderChildren,
          this.transition,
          dialogConfig?.transition
        ),
      ]
    );
  },
});
