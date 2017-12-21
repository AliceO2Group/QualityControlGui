class QCObjects extends HTMLElement {
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
          <h1 class="ph3">Objects</h1>
        </div>

        <div class="pane scroll-y ph3">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${
                model.get('objectsTree') ? this.subTreeContent(model.get('objectsTree')) : ''
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  subTreeContent(objectTree, level, rows) {
    level = level || 0;
    rows = rows || [];

    const color = objectTree.status === 'active' ? 'success' : 'alert';

    rows.push(html`<tr key="key_${objectTree.name}">
        <td style="padding-left: ${level * 2}em;">
          ${!objectTree.object && objectTree.open ? html`<svg onclick=${e => {objectTree.toggle()}} viewBox="0 0 8 8" class="icon gray" fill="currentcolor"><path d="M0 2l4 4 4-4h-8z" /></svg>` : ''}
          ${!objectTree.object && !objectTree.open ? html`<svg onclick=${e => {objectTree.toggle()}} viewBox="0 0 8 8" class="icon gray" fill="currentcolor"><path d="M2 0v8l4-4-4-4z" /></svg>` : ''}
          ${objectTree.object ? html`<svg viewBox="0 0 8 8" class="icon" fill="currentcolor"></svg>` : ''}

          ${
            objectTree.object
              ? html`<svg viewBox="0 0 8 8" fill="currentcolor" class="icon ${color}"><path d="M0 0v7h8v-1h-7v-6h-1zm5 0v5h2v-5h-2zm-3 2v3h2v-3h-2z" /></svg>`
              : html`<svg viewBox="0 0 8 8" class="icon ${color}" fill="currentcolor"><path d="M0 0v2h8v-1h-5v-1h-3zm0 3v4.5c0 .28.22.5.5.5h7c.28 0 .5-.22.5-.5v-4.5h-8z" /></svg>`
          }
          ${objectTree.name}
        </td>
        <td>
          ${objectTree.object ? objectTree.object.status : ''}
        </td>
      </tr>`)

    if (objectTree.open || level === 0) {
      level++;
      objectTree.childrens.map(children => this.subTreeContent(children, level, rows));
    }

    return rows;
  }
}

customElements.define('qc-objects', QCObjects);
