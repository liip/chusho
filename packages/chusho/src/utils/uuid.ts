let currentUuid = 0;

export default function uuid(prefix = ''): string {
  const id = currentUuid++;
  return prefix ? `${prefix}-${id}` : id.toString();
}
