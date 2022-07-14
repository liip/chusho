describe('uid', async () => {
  const { default: uid } = await vi.importActual('../uid');

  it('should generate unique Ids', async () => {
    expect(typeof uid()).toBe('string');
    expect(uid('prefix')).toMatch('prefix-');
  });
});
