class QCCollection extends HTMLElement {
  connectedCallback() {
    this.render();
    model.observe(this.render.bind(this));
  }

  render() {
    render(this, this.content());
  }

  content() {
    return html`
      <div class="pane-group pane-group-column fill-parent">
        <div>
          <h1 class="ph3">
            ${model.get('collection').name}
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M4 0l-1 3h-3l2.5 2-1 3 2.5-2 2.5 2-1-3 2.5-2h-3l-1-3z" id="star" /></svg>
          </h1>
        </div>

        <div class="pane scroll-y ph3">
          <qc-folder></qc-folder>
        </div>
      </div>
    `;
  }
}

customElements.define('qc-collection', QCCollection);
