export function getSiblingIndexByArrowKey(
  list: Readonly<Array<string | number>>,
  current: string | number,
  key: string,
  rtl?: boolean
): number | undefined {
  const currentIndex = list.indexOf(current);
  const index = currentIndex > -1 ? currentIndex : 0;
  const right = ['ArrowRight', 'Right'];
  const left = ['ArrowLeft', 'Left'];

  let newIndex;

  if ((left.includes(key) && rtl) || (right.includes(key) && !rtl)) {
    newIndex = index === list.length - 1 ? 0 : index + 1;
  } else if ((left.includes(key) && !rtl) || (right.includes(key) && rtl)) {
    newIndex = index === 0 ? list.length - 1 : index - 1;
  } else if (key === 'Home') {
    newIndex = 0;
  } else if (key === 'End') {
    newIndex = list.length - 1;
  }

  return newIndex;
}
