import { ensureArray, getAtIndex } from '../arrays';

describe('ensureArray', () => {
  it('return by reference if the provided argument is an array', () => {
    const array = [0, 1];

    expect(ensureArray(array)).toBe(array);
  });

  it('return a new array if the provided argument is not an array', () => {
    expect(ensureArray(0)).toEqual([0]);
    expect(ensureArray('foo')).toEqual(['foo']);
    expect(ensureArray({ foo: 'bar' })).toEqual([{ foo: 'bar' }]);
    expect(ensureArray({ foo: 'bar' })).toEqual([{ foo: 'bar' }]);
  });
});

describe('getAtIndex', () => {
  it('return the element at the provided positive index', () => {
    const array = ['0', '1', '2'];

    expect(getAtIndex(array, 0)).toEqual('0');
    expect(getAtIndex(array, 1)).toEqual('1');
    expect(getAtIndex(array, 2)).toEqual('2');
  });

  it('return the element at the provided negative index, counting from the last element in the array', () => {
    const array = ['0', '1', '2'];

    expect(getAtIndex(array, -1)).toEqual('2');
    expect(getAtIndex(array, -2)).toEqual('1');
    expect(getAtIndex(array, -3)).toEqual('0');
  });

  it('return `undefined` if index is not part of the array or not not a number', () => {
    const array = ['0', '1', '2'];

    expect(getAtIndex(array, 10)).toEqual(undefined);
    expect(getAtIndex(array, -10)).toEqual(undefined);
    expect(getAtIndex(array, NaN)).toEqual(undefined);
    expect(getAtIndex(array, {})).toEqual(undefined);
    expect(getAtIndex(array, [])).toEqual(undefined);
  });
});
