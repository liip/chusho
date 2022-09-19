import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import useKeyboardListNavigation from './useKeyboardListNavigation';

const fixture = [
  { id: 0, data: { disabled: false, text: 'adipisicing' } },
  { id: 1, data: { disabled: false, text: 'lorem cupidatat' } },
  { id: 2, data: { disabled: false, text: 'duis dolor' } },
  { id: 3, data: { disabled: false, text: 'id et deserunt' } },
  { id: 4, data: { disabled: false, text: 'in adipisicing' } },
  { id: 5, data: { disabled: true, text: 'eiusmod' } },
  { id: 6, data: { disabled: false, text: 'deserunt' } },
];

let callback;
let wrapper;

const TestComponent = {
  props: {
    initialIndex: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const activeIndex = ref(props.initialIndex);
    callback = vi.fn((_, index) => (activeIndex.value = index));

    return {
      handleKeyboardNavigation: useKeyboardListNavigation(callback, {
        resolveItems: () => fixture,
        resolveActiveIndex: () => activeIndex.value,
        resolveDisabled: (item) => item.data.disabled,
        loop: props.loop,
      }),
    };
  },

  template: '<div @keydown="handleKeyboardNavigation"></div>',
};

describe('useKeyboardListNavigation', () => {
  describe('use navigation keys', () => {
    beforeEach(() => {
      wrapper = mount(TestComponent);
    });

    it('return item id on key down', () => {
      expect(callback).not.toBeCalled();

      wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 1);

      wrapper.trigger('keydown', { key: 'ArrowUp' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 0);

      wrapper.trigger('keydown', { key: 'End' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);

      wrapper.trigger('keydown', { key: 'Home' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 0);
    });

    it('skip disabled items in both direction', () => {
      expect(callback).not.toBeCalled();

      wrapper.trigger('keydown', { key: 'End' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);

      wrapper.trigger('keydown', { key: 'ArrowUp' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 4);

      wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);
    });

    it('loop through items only if requested', () => {
      wrapper.trigger('keydown', { key: 'ArrowUp' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 0);

      wrapper.trigger('keydown', { key: 'End' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);

      wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);

      wrapper.unmount();
      wrapper = mount(TestComponent, { props: { loop: true } });

      wrapper.trigger('keydown', { key: 'ArrowUp' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);

      wrapper.trigger('keydown', { key: 'ArrowDown' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 0);
    });
  });

  describe('use characters keys', () => {
    it('search multiple characters', () => {
      wrapper = mount(TestComponent);

      wrapper.trigger('keydown', { key: 'i' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 3);

      wrapper.trigger('keydown', { key: 'n' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 4);
    });

    it('reset query if too much time has elapsed between two keystrokes', () => {
      // See https://github.com/vitest-dev/vitest/issues/649#issuecomment-1159141487
      vi.useFakeTimers({
        toFake: ['setTimeout', 'clearTimeout'],
      });

      wrapper = mount(TestComponent);

      wrapper.trigger('keydown', { key: 'i' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 3);

      vi.runAllTimers();

      wrapper.trigger('keydown', { key: 'd' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);

      vi.useRealTimers();
    });

    it('start searching from the current index', () => {
      wrapper = mount(TestComponent, { props: { initialIndex: 2 } });

      wrapper.trigger('keydown', { key: 'd' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 6);
    });

    it('search from the beginning if no result is found after the current index', () => {
      wrapper = mount(TestComponent, { props: { initialIndex: 5 } });

      wrapper.trigger('keydown', { key: 'a' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), 0);
    });

    it('does´t return a disabled item', () => {
      wrapper = mount(TestComponent);

      wrapper.trigger('keydown', { key: 'e' });
      expect(callback).toHaveBeenCalledWith(expect.any(KeyboardEvent), null);
    });
  });
});
