class ShowcaseRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Inject the stylesheets within the shadow root
    // so that it doesn't leak outside of the component.
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/dist/showcase.css';
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    // The slot content must be moved to the shadow root
    // for the scoped style above to be applied.
    this.shadowRoot.append(...this.childNodes);
  }
}

customElements.define('showcase-root', ShowcaseRoot);
