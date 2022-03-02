const uid = jest.requireActual('../uid').default;

describe('uid', () => {
  it('should generate unique Ids', () => {
    expect(typeof uid()).toBe('string');
    expect(uid('prefix')).toMatch('prefix-');
  });
});
