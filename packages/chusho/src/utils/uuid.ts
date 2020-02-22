let currentUuid = 0;

export default function uuid(): number {
  return currentUuid++;
}
