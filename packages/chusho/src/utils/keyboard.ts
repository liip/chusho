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

export function getFocusableElements(el: Element): Array<HTMLElement> {
  // List courtesy of a11y-dialog
  // https://github.com/edenspiekermann/a11y-dialog
  const focusableEls = el.querySelectorAll<HTMLElement>(
    [
      'a[href]:not([tabindex^="-"]):not([inert])',
      'area[href]:not([tabindex^="-"]):not([inert])',
      'input:not([disabled]):not([inert])',
      'select:not([disabled]):not([inert])',
      'textarea:not([disabled]):not([inert])',
      'button:not([disabled]):not([inert])',
      'iframe:not([tabindex^="-"]):not([inert])',
      'audio:not([tabindex^="-"]):not([inert])',
      'video:not([tabindex^="-"]):not([inert])',
      '[contenteditable]:not([tabindex^="-"]):not([inert])',
      '[tabindex]:not([tabindex^="-"]):not([inert])',
    ].join(',')
  );
  return Array.from(focusableEls);
}
