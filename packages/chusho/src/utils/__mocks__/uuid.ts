export default jest.fn().mockImplementation((prefix = '') => {
  const id = '{uniqueId}';
  return prefix ? `${prefix}-${id}` : id;
});
