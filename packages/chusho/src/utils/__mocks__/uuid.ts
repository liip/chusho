export default jest.fn().mockImplementation((prefix = '') => {
  const id = 'UNIQUE_ID';
  return prefix ? `${prefix}-${id}` : id;
});
