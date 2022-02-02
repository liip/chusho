export const PORTAL_ID = 'chusho-dialogs-portal';

export function createPortalIfNotExists(): void {
  if (!document.getElementById(PORTAL_ID)) {
    const portalNode = document.createElement('div');
    portalNode.setAttribute('id', PORTAL_ID);
    document.body.insertAdjacentElement('beforeend', portalNode);
  }
}

export function getPortalNodeSiblings(): HTMLElement[] {
  return Array.from(
    document.body.children as HTMLCollectionOf<HTMLElement>
  ).filter((el) => {
    // Ignore already non-visible elements such as <script>
    return el.offsetParent !== null && el.id !== PORTAL_ID;
  });
}

export function preventAccessToPageContent(): void {
  getPortalNodeSiblings().forEach((el) => {
    el.setAttribute('aria-hidden', 'true');
  });
}

export function releaseAccessToPageContent(): void {
  getPortalNodeSiblings().forEach((el) => {
    el.removeAttribute('aria-hidden');
  });
}
