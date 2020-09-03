import Vue, { VNode, VNodeData } from 'vue';
import { mergeData } from 'vue-functional-data-merge';
import { MountingPortal } from 'portal-vue';
import ClientOnly from 'vue-client-only';
import { filterVueData, isPlainObject } from '../../utils/objects';
import { getFocusableElements } from '../../utils/keyboard';

const PORTAL_ID = 'chusho-dialogs-portal';
const KEY_TAB = 9;
const KEY_ESC = 27;

interface DialogData {
  savedActiveElement: null | HTMLElement;
  focusableElements: Array<HTMLElement>;
}

export default Vue.extend({
  name: 'CDialog',

  model: {
    prop: 'open',
    event: 'toggle',
  },

  props: {
    /**
     * Control the Dialog state
     */
    open: {
      type: Boolean,
      required: true,
    },
    /**
     * The object can contain any Vue built-in [transition component props](https://vuejs.org/v2/api/#transition).
     *
     * For example: `{ name: "fade", mode: "out-in" }`.
     *
     * If you defined a default transition in the config and want to disable it, use `false`.
     */
    transition: {
      type: [Object, Boolean],
      default: null,
    },
  },

  data(): DialogData {
    return {
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
  },

  methods: {
    activate(): void {
      if (this.$chusho.openDialogs.includes(this)) return;

      this.savedActiveElement = document.activeElement as HTMLElement;

      // Store the dialog instance in a global array
      // This allow closing only the last one when pressing ESC and multiple dialogs are open
      this.$chusho.openDialogs.push(this);

      this.$nextTick(() => {
        this.focusableElements = getFocusableElements(
          this.$refs.dialog as Element
        );
        this.firstFocusableEl?.focus();
        this.preventAccessToPageContent();
      });

      document.addEventListener('keydown', this.handleKeyDown);
    },

    deactivate(): void {
      this.releaseAccessToPageContent();

      const i = this.$chusho.openDialogs.indexOf(this);
      this.$chusho.openDialogs.splice(i, 1);

      this.savedActiveElement?.focus();

      document.removeEventListener('keydown', this.handleKeyDown);
    },

    createPortalIfNotExists(): void {
      if (!document.getElementById(PORTAL_ID)) {
        const portalNode = document.createElement('div');
        portalNode.setAttribute('id', PORTAL_ID);
        document.body.insertAdjacentElement('beforeend', portalNode);
      }
    },

    getPortalNodeSiblings(): HTMLElement[] {
      return Array.from(
        document.body.children as HTMLCollectionOf<HTMLElement>
      ).filter((el) => {
        // Ignore already non-visible elements such as <script>
        return el.offsetParent !== null && el.id != PORTAL_ID;
      });
    },

    preventAccessToPageContent(): void {
      this.getPortalNodeSiblings().forEach((el) => {
        el.setAttribute('aria-hidden', 'true');
      });
    },

    releaseAccessToPageContent(): void {
      this.getPortalNodeSiblings().forEach((el) => {
        el.removeAttribute('aria-hidden');
      });
    },

    handleKeyDown(e: KeyboardEvent): void {
      switch (e.keyCode) {
        case KEY_ESC:
          if (
            this ===
            this.$chusho.openDialogs[this.$chusho.openDialogs.length - 1]
          ) {
            this.$emit('toggle', false);
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
  },

  render(h): VNode {
    const dialogConfig = this.$parent?.$chusho?.options?.components?.dialog;
    let children: VNode[] = [];

    // Do not render dialogs on the server
    if (!this.$isServer) {
      this.createPortalIfNotExists();

      if (this.open) {
        const overlayData: VNodeData = {
          attrs: {
            tabindex: '-1',
          },
          on: {
            click: (e: KeyboardEvent) => {
              if (e.target !== e.currentTarget) return;
              this.$emit('toggle', false);
            },
          },
        };
        const dialogData: VNodeData = {
          attrs: {
            role: 'dialog',
          },
          ref: 'dialog',
        };

        if (dialogConfig?.overlayClass) {
          overlayData.class = dialogConfig.overlayClass;
        }
        if (dialogConfig?.dialogClass) {
          dialogData.class = dialogConfig.dialogClass;
        }

        children.push(
          h('div', overlayData, [
            h(
              'div',
              mergeData(filterVueData(this.$vnode.data), dialogData),
              this.$slots.default
            ),
          ])
        );

        this.$nextTick(this.activate);
      } else {
        this.$nextTick(this.deactivate);
      }

      let transition;

      if (isPlainObject(this.transition)) {
        transition = this.transition;
      } else if (
        this.transition !== false &&
        dialogConfig &&
        dialogConfig.transition
      ) {
        transition = dialogConfig.transition;
      }

      if (transition) {
        children = [
          h(
            'transition',
            {
              props: transition,
              key: 'transition',
            },
            children
          ),
        ];
      }
    }

    return h(ClientOnly, [
      h(
        MountingPortal,
        {
          props: {
            append: true,
            mountTo: `#${PORTAL_ID}`,
          },
        },
        children
      ),
    ]);
  },
});
