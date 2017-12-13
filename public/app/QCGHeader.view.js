class QCGHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    model.observe(this.render.bind(this));
  }

  render() {
    render(this, html`
      <div class="">

        <div class="f6 text-center">
          <h1 class="toolbar-title">
            VK COLLECTION
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M4 0l-1 3h-3l2.5 2-1 3 2.5-2 2.5 2-1-3 2.5-2h-3l-1-3z" id="star" /></svg>
          </h1>
        </div>

        <div class="toolbar-actions">
          <div class="toolbar-action">
            <button class="button default ${model.sidebar() ? 'active' : ''}" onclick=${e => model.sidebar(!model.sidebar())}>
              ${model.sidebar()
                ? html`<svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v8h2v-8h-2zm7 0v8h1v-8h-1zm-1 2l-2 2 2 2v-4z" id="expand-right" /></svg>`
                : html`<svg viewBox="0 0 8 8" fill="currentcolor" class="icon"><path d="M0 0v8h2v-8h-2zm7 0v8h1v-8h-1zm-4 2v4l2-2-2-2z" id="collapse-right" /></svg>`
              }
            </button>
            <button class="button default" onclick=${e => model.sidebar(!model.sidebar())}>
              <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M3.5 0l-.5 1.188-.281.125-1.188-.5-.719.719.5 1.188-.125.281-1.188.5v1l1.188.5.125.313-.5 1.156.719.719 1.188-.5.281.125.5 1.188h1l.5-1.188.281-.125 1.188.5.719-.719-.5-1.188.125-.281 1.188-.5v-1l-1.188-.5-.125-.281.469-1.188-.688-.719-1.188.5-.281-.125-.5-1.188h-1zm.5 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" id="cog" /></svg>
            </button>
          </div>

          <div class="toolbar-action">
            <div class="button-group">
              ${model.tabs().map(tab => html`
                <button
                  class="button default ${model.currentTab() === tab ? 'active' : ''}"
                  onclick=${e => model.currentTab(tab)}>${tab.name} </button>
              `)}
            </div>
          </div>

          <div class="toolbar-action">
            <input placeholder="Search" class="form-control" type="search" oninput=${e => model.searchInput(e.target.value)} />
            <div class="button-group">
              <button class="button default" onclick=${e => model.zoom(model.zoom() + 1)}>
                <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M3.5 0c-1.927 0-3.5 1.573-3.5 3.5s1.573 3.5 3.5 3.5c.592 0 1.166-.145 1.656-.406a1 1 0 0 0 .094.094l1.031 1.031a1.016 1.016 0 1 0 1.438-1.438l-1.031-1.031a1 1 0 0 0-.125-.094c.266-.493.438-1.059.438-1.656 0-1.927-1.573-3.5-3.5-3.5zm0 1c1.387 0 2.5 1.113 2.5 2.5 0 .587-.196 1.137-.531 1.563l-.031.031a1 1 0 0 0-.063.031 1 1 0 0 0-.281.281 1 1 0 0 0-.063.063c-.422.326-.953.531-1.531.531-1.387 0-2.5-1.113-2.5-2.5s1.113-2.5 2.5-2.5zm-1.5 2v1h3v-1h-3z" id="zoom-out" /></svg>
              </button>
              <button class="button default" onclick=${e => model.zoom(model.zoom() - 1)}>
                <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M3.5 0c-1.927 0-3.5 1.573-3.5 3.5s1.573 3.5 3.5 3.5c.592 0 1.166-.145 1.656-.406a1 1 0 0 0 .094.094l1.031 1.031a1.016 1.016 0 1 0 1.438-1.438l-1.031-1.031a1 1 0 0 0-.125-.094c.266-.493.438-1.059.438-1.656 0-1.927-1.573-3.5-3.5-3.5zm0 1c1.387 0 2.5 1.113 2.5 2.5 0 .587-.196 1.137-.531 1.563l-.031.031a1 1 0 0 0-.063.031 1 1 0 0 0-.281.281 1 1 0 0 0-.063.063c-.422.326-.953.531-1.531.531-1.387 0-2.5-1.113-2.5-2.5s1.113-2.5 2.5-2.5zm-.5 1v1h-1v1h1v1h1v-1h1v-1h-1v-1h-1z" id="zoom-in" /></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    `);
  }
}

customElements.define('qcg-header', QCGHeader);
