import useActiveElement from './useActiveElement';

describe('useActiveElement', () => {
  let activeElement;

  beforeEach(() => {
    activeElement = useActiveElement();
  });

  it('has no element by default', () => {
    expect(activeElement.element.value).toBe(null);
  });

  it('saves and restores the same element', () => {
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    btn.focus();
    activeElement.save();

    expect(activeElement.element.value).toBe(btn);

    btn.blur();
    expect(document.activeElement).toBe(document.body);

    activeElement.restore();
    expect(document.activeElement).toBe(btn);
    expect(activeElement.element.value).toBe(null);
  });
});
