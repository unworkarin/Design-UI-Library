/* ui components - vanilla Web Components (no framework) */
/* Exposes: <ui-button>, <ui-card> and registers theme utilities via CSS variables */

const templateButton = document.createElement('template');
templateButton.innerHTML = `
  <style>
    :host {
      --ui-font-family: var(--ui-font-family, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial);
      --ui-primary: var(--ui-primary, #0d6efd);
      --ui-primary-contrast: var(--ui-primary-contrast, #fff);
      --ui-radius: var(--ui-radius, 8px);
      display: inline-block;
    }
    button {
      font-family: var(--ui-font-family);
      background: var(--ui-primary);
      color: var(--ui-primary-contrast);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--ui-radius);
      cursor: pointer;
      font-size: 1rem;
      transition: transform .08s ease, box-shadow .08s ease;
    }
    button:active { transform: translateY(1px); }
    button[outline] {
      background: transparent;
      color: var(--ui-primary);
      border: 1px solid var(--ui-primary);
    }
    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
  <button part="button"><slot></slot></button>
`;

class UIButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateButton.content.cloneNode(true));
    this._btn = this.shadowRoot.querySelector('button');
  }
  static get observedAttributes() { return ['disabled','outline']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'disabled') {
      if (this.hasAttribute('disabled')) this._btn.setAttribute('disabled','');
      else this._btn.removeAttribute('disabled');
    }
    if (name === 'outline') {
      if (this.hasAttribute('outline')) this._btn.setAttribute('outline','');
      else this._btn.removeAttribute('outline');
    }
  }
  connectedCallback() {
    // forward click events
    this._btn.addEventListener('click', (e) => {
      if (this.hasAttribute('disabled')) { e.preventDefault(); return; }
      this.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    });
  }
}
customElements.define('ui-button', UIButton);


const templateCard = document.createElement('template');
templateCard.innerHTML = `
  <style>
    :host {
      --ui-bg: var(--ui-bg, #fff);
      --ui-shadow: var(--ui-shadow, 0 4px 10px rgba(0,0,0,0.06));
      --ui-radius: var(--ui-radius, 8px);
      display: block;
      box-sizing: border-box;
    }
    .card {
      background: var(--ui-bg);
      border-radius: var(--ui-radius);
      box-shadow: var(--ui-shadow);
      padding: 1rem;
      font-family: var(--ui-font-family, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial);
    }
    .card .title { font-weight: 600; margin-bottom: .5rem; }
    .card .content { color: #333; }
  </style>
  <div class="card">
    <div class="title"><slot name="title"></slot></div>
    <div class="content"><slot></slot></div>
  </div>
`;

class UICard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateCard.content.cloneNode(true));
  }
}
customElements.define('ui-card', UICard);

/* design token helper: apply theme variables to document root */
export function applyTheme(theme) {
  const root = document.documentElement;
  for (const k of Object.keys(theme)) {
    root.style.setProperty(k, theme[k]);
  }
}
