export const PORTAL_ID = 'chusho-dialogs-portal';

export function createPortalIfNotExists(): void {
  if (!document.getElementById(PORTAL_ID)) {
    const portalNode = document.createElement('div');
    portalNode.setAttribute('id', PORTAL_ID);
    document.body.insertAdjacentElement('beforeend', portalNode);
  }
}
