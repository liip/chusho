export enum Focus {
  First,
  Previous,
  Next,
  Last,
}

export function getNextFocusByKey(key: string, rtl = false): Focus | null {
  switch (key) {
    case 'ArrowRight':
    case 'Right':
    case 'ArrowDown':
    case 'Down':
      return rtl ? Focus.Previous : Focus.Next;

    case 'ArrowLeft':
    case 'Left':
    case 'ArrowUp':
    case 'Up':
      return rtl ? Focus.Next : Focus.Previous;

    case 'Home':
      return Focus.First;

    case 'End':
      return Focus.Last;

    default:
      return null;
  }
}

/**
 * Logic courtesy of Headless UI
 * https://github.com/tailwindlabs/headlessui
 */
export function calculateActiveIndex<TItem>(
  action: Focus,
  resolvers: {
    resolveItems(): TItem[];
    resolveActiveIndex(): number | null;
    resolveDisabled(item: TItem): boolean;
  },
  loop = false
): number | null {
  const items = resolvers.resolveItems();
  if (items.length <= 0) return null;

  const currentActiveIndex = resolvers.resolveActiveIndex();
  const activeIndex = currentActiveIndex ?? -1;

  const nextActiveIndex = (() => {
    switch (action) {
      case Focus.First:
        return items.findIndex((item) => !resolvers.resolveDisabled(item));

      case Focus.Previous: {
        const index = items
          .slice()
          .reverse()
          .findIndex((item, index, all) => {
            if (activeIndex !== -1 && all.length - index - 1 >= activeIndex)
              return false;
            return !resolvers.resolveDisabled(item);
          });
        if (index === -1) {
          if (loop) {
            return calculateActiveIndex(Focus.Last, resolvers);
          }
          return index;
        }
        return items.length - 1 - index;
      }

      case Focus.Next: {
        const index = items.findIndex((item, index) => {
          if (index <= activeIndex) return false;
          return !resolvers.resolveDisabled(item);
        });

        if (loop && index === -1) {
          return calculateActiveIndex(Focus.First, resolvers);
        }

        return index;
      }

      case Focus.Last: {
        const index = items
          .slice()
          .reverse()
          .findIndex((item) => !resolvers.resolveDisabled(item));
        if (index === -1) return index;
        return items.length - 1 - index;
      }

      default:
        throw new Error(`Unexpected focus: ${action}`);
    }
  })();

  return nextActiveIndex === -1 ? currentActiveIndex : nextActiveIndex;
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
