export default function uid(prefix = ''): string {
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  return prefix ? `${prefix}-${id}` : id;
}
