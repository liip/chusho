import { isObject, isPlainObject, mergeDeep } from '../objects';

describe('objects', () => {
  describe('isPlainObject', () => {
    it('return true if the value is a plain object', () => {
      expect(isPlainObject({ foo: 'bar' })).toBe(true);
    });

    it('return false otherwise', () => {
      expect(isPlainObject(true)).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject('[object Object]')).toBe(false);
      expect(isPlainObject(12)).toBe(false);
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject(undefined)).toBe(false);
      expect(isPlainObject(NaN)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('return true if the value is an object', () => {
      expect(isObject({ foo: 'bar' })).toBe(true);
      expect(isObject(new Date())).toBe(true);
      expect(isObject([])).toBe(true);
    });

    it('return false otherwise', () => {
      expect(isObject(true)).toBe(false);
      expect(isObject('[object Object]')).toBe(false);
      expect(isObject(12)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(NaN)).toBe(false);
    });
  });

  describe('mergeDeep', () => {
    it('merges objects recursively', () => {
      const classA = () => {
        return 'class-a';
      };

      const classB = () => {
        return 'class-b';
      };

      const first = {
        components: {
          btn: {
            class: classA,
            disabled: false,
          },
        },
        directives: ['directive-1'],
      };

      const second = {
        components: {
          btn: {
            class: classB,
          },
        },
        directives: ['directive-2'],
        mixins: ['mixin-1'],
      };

      const actual = {
        components: {
          btn: {
            class: classB,
            disabled: false,
          },
        },
        directives: ['directive-2'],
        mixins: ['mixin-1'],
      };

      expect(mergeDeep(first, second)).toEqual(actual);
    });
  });
});
