import uid from '../uid';

describe('uid', () => {
  it('should generate unique Ids', () => {
    expect(typeof uid()).toBe('string');
    expect(uid('prefix')).toBe('prefix-1');
    expect(uid('prefix')).toBe('prefix-2');
  });
});
