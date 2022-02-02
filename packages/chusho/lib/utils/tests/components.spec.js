import { Transition } from 'vue';
import { generateConfigClass, renderWithTransition } from '../components';

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

  describe('renderWithTransition', () => {
    it('use transition from prop when its provided', () => {
      const render = jest.fn(() => 'rendered');
      const props = { name: 'fade' };
      const actual = renderWithTransition(render, props);

      expect(actual.type).toBe(Transition);
      expect(actual.props).toBe(props);
      expect(actual.children.default).toBe(render);
    });

    it('use transition from config when there‘s no prop', () => {
      const render = jest.fn(() => 'rendered');
      const config = { name: 'fade' };
      const actual = renderWithTransition(render, null, config);

      expect(actual.type).toBe(Transition);
      expect(actual.props).toBe(config);
      expect(actual.children.default).toBe(render);
    });

    it('skips transition if there’s neither transition prop or config', () => {
      const render = jest.fn(() => 'rendered');
      const actual = renderWithTransition(render, null, null);

      expect(actual).toBe('rendered');
    });

    it('skips transition from config if prop is explicitely false', () => {
      const render = jest.fn(() => 'rendered');
      const actual = renderWithTransition(render, false, { name: 'fade' });

      expect(actual).toBe('rendered');
    });
  });
});
