import { generateConfigClass } from '../components';

describe('components', () => {
  describe('generateConfigClass', () => {
    it('should invoke the class with context when its a function', () => {
      expect(
        generateConfigClass(({ active }) => ({ foo: active, bar: !active }), {
          active: true,
        })
      ).toEqual({ class: { foo: true, bar: false } });
    });

    it('should return the value when it’s not a function', () => {
      expect(
        generateConfigClass('foo bar', {
          active: true,
        })
      ).toEqual({ class: 'foo bar' });

      expect(
        generateConfigClass(['foo', 'bar'], {
          active: true,
        })
      ).toEqual({ class: ['foo', 'bar'] });

      expect(
        generateConfigClass(
          { foo: true, bar: false },
          {
            active: true,
          }
        )
      ).toEqual({ class: { foo: true, bar: false } });
    });

    it('should return an empty object when `ctx.bare` is `true`', () => {
      expect(
        generateConfigClass(({ active }) => ({ foo: active, bar: !active }), {
          active: true,
          bare: true,
        })
      ).toEqual({});

      expect(
        generateConfigClass('something', {
          bare: true,
        })
      ).toEqual({});
    });
  });
});
