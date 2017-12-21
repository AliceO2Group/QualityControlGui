class QCCollections extends HTMLElement {
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
          <h1 class="ph3">Collections</h1>
        </div>

        <div class="pane scroll-y ph3">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              ${
                model.get('collections').map(collection => html`
                  <tr onclick=${e => {
                    model.router.go(`/a/collections/${collection.name}`)
                  }}>
                    <td><svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v4h4v-4h-4zm5 2v3h-3v1h4v-4h-1zm2 2v3h-3v1h4v-4h-1z" id="layers" /></svg> ${collection.name}</td>
                    <td>${collection.owner}</td>
                    <td>${collection.popularity}</td>
                  </tr>
                `)
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

customElements.define('qc-collections', QCCollections);
