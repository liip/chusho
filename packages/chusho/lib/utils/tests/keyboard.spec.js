import { Focus, calculateActiveIndex, getNextFocusByKey } from '../keyboard';

describe('keyboard', () => {
  describe('getNextFocusByKey', () => {
    it('returns First using Home key', () => {
      expect(getNextFocusByKey('Home')).toBe(Focus.First);
    });

    it('returns Last using End key', () => {
      expect(getNextFocusByKey('End')).toBe(Focus.Last);
    });

    describe.each([
      ['left-to-right', Focus.Next, Focus.Previous, false],
      ['right-to-left', Focus.Previous, Focus.Next, true],
    ])('%s', (direction, next, previous, rtl) => {
      it.each(['ArrowRight', 'ArrowDown'])(
        `returns ${next} using %s key`,
        (key) => {
          expect(getNextFocusByKey(key, rtl)).toBe(next);
        }
      );

      it.each(['ArrowLeft', 'ArrowUp'])(
        `returns ${previous} using %s key`,
        (key) => {
          expect(getNextFocusByKey(key, rtl)).toBe(previous);
        }
      );
    });

    it('returns null if the key didn’t match', () => {
      expect(getNextFocusByKey('A')).toBe(null);
    });
  });

  describe('calculateActiveIndex', () => {
    let items;
    let resolvers;

    beforeEach(() => {
      items = [
        { id: 'a', data: { disabled: false } },
        { id: 'b', data: { disabled: false } },
        { id: 'c', data: { disabled: true } },
        { id: 'd', data: { disabled: false } },
        { id: 'e', data: { disabled: true } },
      ];
      resolvers = {
        resolveActiveIndex: () => 0,
        resolveItems: () => items,
        resolveDisabled: (item) => item.data.disabled,
      };
    });

    it('returns the first enabled element', () => {
      expect(
        calculateActiveIndex(Focus.First, {
          ...resolvers,
          resolveActiveIndex: () => 1,
        })
      ).toBe(0);
    });

    it('returns the last enabled element', () => {
      expect(calculateActiveIndex(Focus.Last, resolvers)).toBe(3);
    });

    it('returns the next enabled element', () => {
      expect(calculateActiveIndex(Focus.Next, resolvers)).toBe(1);
    });

    it('returns the same element when looking for the next if the current is the latest enabled', () => {
      expect(
        calculateActiveIndex(Focus.Next, {
          ...resolvers,
          resolveActiveIndex: () => 3,
        })
      ).toBe(3);
    });

    it('returns the first element when looking for the next if the current is the latest enabled with looping enabled', () => {
      expect(
        calculateActiveIndex(
          Focus.Next,
          { ...resolvers, resolveActiveIndex: () => 3 },
          true
        )
      ).toBe(0);
    });

    it('returns the previous enabled element', () => {
      expect(
        calculateActiveIndex(Focus.Previous, {
          ...resolvers,
          resolveActiveIndex: () => 3,
        })
      ).toBe(1);
    });

    it('returns the same element when looking for the previous if the current is the first enabled', () => {
      expect(calculateActiveIndex(Focus.Previous, resolvers)).toBe(0);
    });

    it('returns the first element when looking for the previous if the current is the first enabled with looping enabled', () => {
      expect(calculateActiveIndex(Focus.Previous, resolvers, true)).toBe(3);
    });

    it('returns null if there’s no items', () => {
      items = [];
      expect(calculateActiveIndex(Focus.First, resolvers)).toBe(null);
    });

    it('throws if the given Focus doesn’t exist', () => {
      expect(() => calculateActiveIndex('nope', resolvers)).toThrow();
    });
  });
});
