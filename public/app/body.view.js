function QCGView(model) {
  return html`
    <div class="container fill-parent">
      <qc-header class="toolbar"></qc-header>

      <div class="container-content">
        <div class="pane-group fill-parent">
          <qc-sidebar class="pane pane-sidebar ${model.sidebar() ? null : 'pane-closed'}"></qc-sidebar>
          ${model.get('route') === model.ROUTE_SHOW_COLLECTION ? html`<qc-collection class="pane"></qc-collection>` : ''}
          ${model.get('route') === model.ROUTE_SHOW_COLLECTIONS ? html`<qc-collections class="pane"></qc-collections>` : ''}
          ${model.get('route') === model.ROUTE_SHOW_OBJECTS ? html`<qc-objects class="pane"></qc-objects>` : ''}
        </div>
      </div>
    </div>
  `;
}

