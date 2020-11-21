import {
  h,
  VNode,
  defineComponent,
  Teleport,
  Transition,
  Ref,
  ref,
  reactive,
  computed,
  inject,
  nextTick,
  TransitionProps,
  PropType,
  mergeProps,
  onUpdated,
} from 'vue';
import { isPlainObject } from '../../utils/objects';
import { getFocusableElements } from '../../utils/keyboard';
import { DollarChusho } from 'src/types';

const PORTAL_ID = 'chusho-dialogs-portal';
const KEY_TAB = 9;
const KEY_ESC = 27;

export interface DialogData {
  active: boolean;
  savedActiveElement: null | HTMLElement;
  focusableElements: Array<HTMLElement>;
}

function createPortalIfNotExists(): void {
  if (!document.getElementById(PORTAL_ID)) {
    const portalNode = document.createElement('div');
    portalNode.setAttribute('id', PORTAL_ID);
    document.body.insertAdjacentElement('beforeend', portalNode);
  }
}

function getPortalNodeSiblings(): HTMLElement[] {
  return Array.from(
    document.body.children as HTMLCollectionOf<HTMLElement>
  ).filter((el) => {
    // Ignore already non-visible elements such as <script>
    return el.offsetParent !== null && el.id != PORTAL_ID;
  });
}

function preventAccessToPageContent(): void {
  getPortalNodeSiblings().forEach((el) => {
    el.setAttribute('aria-hidden', 'true');
  });
}

function releaseAccessToPageContent(): void {
  getPortalNodeSiblings().forEach((el) => {
    el.removeAttribute('aria-hidden');
  });
}

export default defineComponent({
  name: 'CDialog',

  inheritAttrs: false,

  props: {
    /**
     * Control the Dialog state
     */
    modelValue: {
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
      type: [Object, Boolean] as PropType<TransitionProps | boolean>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { attrs, slots, emit }) {
    const $chusho = inject<DollarChusho>('$chusho');
    const state = reactive<DialogData>({
      active: false,
      savedActiveElement: null,
      focusableElements: [],
    });
    const dialogElement: Ref<HTMLElement | null> = ref(null);
    const firstFocusableEl = computed<HTMLElement | undefined>(
      () => state.focusableElements[0]
    );
    const lastFocusableEl = computed<HTMLElement | undefined>(
      () => state.focusableElements[state.focusableElements.length - 1]
    );

    onUpdated(() => {
      if (dialogElement.value) {
        state.focusableElements = getFocusableElements(dialogElement.value);
      }
    });

    function activate(): void {
      if (state.active) return;

      state.active = true;
      state.savedActiveElement = document.activeElement as HTMLElement;

      // Store the dialog instance in a global array
      // This allow closing only the last one when pressing ESC and multiple dialogs are open
      $chusho?.openDialogs.push(state);

      nextTick(() => {
        if (!dialogElement.value) return;
        state.focusableElements = getFocusableElements(dialogElement.value);
        firstFocusableEl.value?.focus();
        preventAccessToPageContent();
      });

      document.addEventListener('keydown', handleKeyDown);
    }

    function deactivate(): void {
      if (!state.active) return;

      releaseAccessToPageContent();

      const index = $chusho?.openDialogs.indexOf(state);
      if (index) {
        $chusho?.openDialogs.splice(index, 1);
      }

      state.savedActiveElement?.focus();

      document.removeEventListener('keydown', handleKeyDown);

      state.active = false;
    }

    function handleKeyDown(e: KeyboardEvent): void {
      switch (e.keyCode) {
        case KEY_ESC:
          if (state === $chusho?.openDialogs[$chusho.openDialogs.length - 1]) {
            emit('update:modelValue', false);
          }
          break;

        case KEY_TAB:
          if (state.focusableElements.length === 1) {
            e.preventDefault();
          } else if (e.shiftKey) {
            if (
              lastFocusableEl.value &&
              document.activeElement === firstFocusableEl.value
            ) {
              e.preventDefault();
              lastFocusableEl.value.focus();
            }
          } else {
            if (
              firstFocusableEl.value &&
              document.activeElement === lastFocusableEl.value
            ) {
              e.preventDefault();
              firstFocusableEl.value.focus();
            }
          }
          break;
      }
    }

    return () => {
      const dialogConfig = $chusho?.options?.components?.dialog;

      // TODO: Do not render dialogs on the server
      createPortalIfNotExists();

      const getChildren = () => {
        const children: VNode[] = [];

        if (props.modelValue) {
          let overlayProps: Record<string, unknown> = {
            tabindex: '-1',
            onClick: (e: KeyboardEvent) => {
              if (e.target !== e.currentTarget) return;
              emit('update:modelValue', false);
            },
          };

          let dialogProps = mergeProps(attrs, {
            ...attrs,
            role: 'dialog',
            ref: dialogElement,
          });

          if (dialogConfig?.overlayClass) {
            overlayProps = mergeProps(overlayProps, {
              class: dialogConfig.overlayClass,
            });
          }
          if (dialogConfig?.dialogClass) {
            dialogProps = mergeProps(dialogProps, {
              class: dialogConfig.dialogClass,
            });
          }

          children.push(h('div', overlayProps, h('div', dialogProps, slots)));

          nextTick(activate);
        } else {
          nextTick(deactivate);
        }

        return children;
      };

      let transitionProps: TransitionProps | null = null;

      if (isPlainObject(props.transition)) {
        transitionProps = props.transition;
      } else if (
        props.transition !== false &&
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
          ? h(Transition, transitionProps, { default: getChildren })
          : getChildren()
      );
    };
  },
});
