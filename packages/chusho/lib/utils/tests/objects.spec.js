import {
  isNil,
  isObject,
  isPlainObject,
  isPrimitive,
  mergeDeep,
} from '../objects';

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

  describe('isPrimitive', () => {
    it('return true if the value is a primitive', () => {
      expect(isPrimitive(undefined)).toBe(true);
      expect(isPrimitive(true)).toBe(true);
      expect(isPrimitive(false)).toBe(true);
      expect(isPrimitive(12)).toBe(true);
      expect(isPrimitive('foo')).toBe(true);
      expect(isPrimitive(NaN)).toBe(true);
      expect(isPrimitive(BigInt(9007199254740991))).toBe(true);
      expect(isPrimitive(Symbol('foo'))).toBe(true);
    });

    it('return false otherwise', () => {
      expect(isPrimitive(null)).toBe(false);
      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive([])).toBe(false);
      expect(isPrimitive(new Date())).toBe(false);
    });
  });

  describe('isNil', () => {
    it('return true if the value is null or undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it('return false otherwise', () => {
      expect(isNil(true)).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil(new Date())).toBe(false);
      expect(isNil([])).toBe(false);
      expect(isNil('string')).toBe(false);
      expect(isNil(12)).toBe(false);
      expect(isNil(NaN)).toBe(false);
      expect(isNil({})).toBe(false);
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
