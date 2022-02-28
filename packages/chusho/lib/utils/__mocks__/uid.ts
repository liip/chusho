let currentuid = 0;

export default jest.fn().mockImplementation((prefix = '') => {
  const id = currentuid++;
  return prefix ? `${prefix}-${id}` : id.toString();
});

export function reset(): void {
  currentuid = 0;
}
