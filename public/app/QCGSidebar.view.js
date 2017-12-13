class QCGSidebar extends HTMLElement {
  connectedCallback() {
    this.render();
    model.observe(this.render.bind(this));
  }

  render() {
    render(this, html`<div class="">
        <div class="pane-sidebar-content">
          ${
            model.searchResult() ? sidebarSearchResult(model.searchResult()) : sidebarMine()
          }
        </div>
      </div>`);

    function sidebarMine() {
      return html`<div>
          <div class="sidebar-menu-title">Explore</div>
          <div class="sidebar-menu-item">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v4h4v-4h-4zm5 2v3h-3v1h4v-4h-1zm2 2v3h-3v1h4v-4h-1z" id="layers" /></svg>
            Collections</div>
          <div class="sidebar-menu-item">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v7h8v-1h-7v-6h-1zm5 0v5h2v-5h-2zm-3 2v3h2v-3h-2z" id="bar-chart" /></svg>
            Objects</div>
          <div class="sidebar-menu-title">My Collections</div>
          <div class="sidebar-menu-item">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v4h4v-4h-4zm5 2v3h-3v1h4v-4h-1zm2 2v3h-3v1h4v-4h-1z" id="layers" /></svg>
            Test</div>
          <div class="sidebar-menu-item">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v4h4v-4h-4zm5 2v3h-3v1h4v-4h-1zm2 2v3h-3v1h4v-4h-1z" id="layers" /></svg>
            Test 2</div>
          <div class="sidebar-menu-item">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" id="plus" /></svg>
            New collection...</div>
          <div class="sidebar-menu-title">My Favorites</div>
          <div class="sidebar-menu-item">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v4h4v-4h-4zm5 2v3h-3v1h4v-4h-1zm2 2v3h-3v1h4v-4h-1z" id="layers" /></svg>
            Alice P2</div>
          <div class="sidebar-menu-item active">
            <svg viewBox="0 0 8 8" class="icon" fill="currentcolor"><path d="M0 0v7h8v-1h-7v-6h-1zm5 0v5h2v-5h-2zm-3 2v3h2v-3h-2z" id="bar-chart" /></svg>
            DAQ 866</div>
        </div>`;
    }
  }
}

customElements.define('qcg-sidebar', QCGSidebar);
