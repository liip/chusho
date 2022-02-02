import {
  defineComponent,
  h,
  inject,
  mergeProps,
  nextTick,
  ref,
  withDirectives,
} from 'vue';

import { DollarChusho } from '../../types';
import clickOutside from '../../directives/clickOutside/clickOutside';
import {
  generateConfigClass,
  renderWithTransition,
} from '../../utils/components';
import { getNextFocusByKey, calculateActiveIndex } from '../../utils/keyboard';
import componentMixin from '../mixins/componentMixin';
import transitionMixin from '../mixins/transitionMixin';
import { SelectedItem } from '../../composables/useSelectable';
import useActiveElement from '../../composables/useActiveElement';

import { SelectOption, SelectOptionData, SelectSymbol } from './CSelect';

export default defineComponent({
  name: 'CSelectOptions',

  mixins: [componentMixin, transitionMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const select = inject(SelectSymbol);
    const active = ref<boolean>(select?.togglable.isOpen.value ?? false);
    const query = ref<string>('');
    const searchIndex = ref<number>(0);
    const clearQueryTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

    return {
      chusho,
      select,
      active,
      activeElement: useActiveElement(),
      query,
      searchIndex,
      clearQueryTimeout,
    };
  },

  methods: {
    activate() {
      if (this.active) return;
      this.active = true;
      this.activeElement.save();
    },

    deactivate() {
      if (!this.active) return;
      this.activeElement.restore();
      this.active = false;
    },

    handleKeydown(e: KeyboardEvent) {
      if (!this.select?.selectable.selectedItemId.value) return;

      const focus = getNextFocusByKey(e.key);
      let newIndex = null;

      if (focus === null) {
        newIndex = this.findItemToFocus(e.key);
      } else {
        newIndex = calculateActiveIndex<SelectOption>(focus, {
          resolveItems: () => this.select?.selectable.items.value ?? [],
          resolveActiveIndex: () =>
            this.select?.selectable.selectedItemIndex.value ?? -1,
          resolveDisabled: (item) => {
            return item.data?.disabled ?? false;
          },
        });
      }

      if (newIndex === null) return;

      e.preventDefault();

      this.select.selectable.setSelectedItem(
        this.select.selectable.items.value[newIndex].id
      );
    },

    findItemToFocus(character: string) {
      const items = this.select?.selectable.items.value ?? [];
      const selectedItemIndex =
        this.select?.selectable.selectedItemIndex.value ?? -1;

      if (!this.query && selectedItemIndex) {
        this.searchIndex = selectedItemIndex;
      }
      this.query += character;
      this.prepareToResetQuery();

      let nextMatch = this.findMatchInRange(
        items,
        this.searchIndex + 1,
        items.length
      );
      if (!nextMatch) {
        nextMatch = this.findMatchInRange(items, 0, this.searchIndex);
      }
      return nextMatch;
    },

    prepareToResetQuery() {
      if (this.clearQueryTimeout) {
        clearTimeout(this.clearQueryTimeout);
        this.clearQueryTimeout = null;
      }
      this.clearQueryTimeout = setTimeout(() => {
        this.query = '';
        this.clearQueryTimeout = null;
      }, 500);
    },

    findMatchInRange(
      items: SelectedItem<SelectOptionData>[],
      startIndex: number,
      endIndex: number
    ) {
      for (let index = startIndex; index < endIndex; index++) {
        const item = items[index];
        const label = item.data?.text;
        if (!item.data?.disabled && label && label.indexOf(this.query) === 0) {
          return index;
        }
      }
      return null;
    },

    renderContent() {
      if (!this.select) return null;

      const elementProps: Record<string, unknown> = {
        ...this.select.togglable.attrs.target.value,
        role: 'listbox',
        'aria-activedescendant': this.select.selectable.selectedItemId.value,
        onKeydown: this.handleKeydown,
        ...generateConfigClass(
          this.chusho?.options?.components?.selectOptions?.class,
          this.$props
        ),
      };

      return this.select.togglable.renderIfOpen(
        () => {
          nextTick(this.activate);
          return withDirectives(
            h('ul', mergeProps(this.$attrs, elementProps), this.$slots),
            [
              [
                clickOutside,
                () => {
                  this.select?.togglable.close();
                },
              ],
            ]
          );
        },
        () => {
          nextTick(this.deactivate);
        }
      );
    },
  },

  render() {
    const selectOptionsConfig = this.chusho?.options?.components?.selectOptions;

    return renderWithTransition(
      this.renderContent,
      this.transition,
      selectOptionsConfig?.transition
    );
  },
});
