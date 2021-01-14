import uuid, { reset } from '../uuid';

describe('uuid', () => {
  it('should automatically increments', () => {
    expect(uuid()).toEqual('0');
    expect(uuid()).toEqual('1');
    expect(uuid('prefix')).toEqual('prefix-2');
  });

  it('reset should start at zero again', () => {
    reset();
    expect(uuid()).toEqual('0');
  });
});
