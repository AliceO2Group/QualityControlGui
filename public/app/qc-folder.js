class QCFolder extends HTMLElement {
  connectedCallback() {
    this.render();
    model.observe(this.render.bind(this));
  }

  render() {
    render(this, this.content());
  }

  content() {
    return html`
    <div class="pane-group fill-parent">
      <div class="pane scroll-y">
        <div class="flex flex-wrap w-100">
          ${model.currentTab().charts.map(chartUrl => html`
            <div class="mo ${model.zoom() === 1 && 'w-100'} ${model.zoom() === 2 && 'w-50'} ${model.zoom() === 3 && 'w-33'} ${model.zoom() === 4 && 'w-25'}">
              <div class="mo-card br3 bg-white m4 pv1">
                <div class="aspect-ratio aspect-ratio-16x9">
                  <div class="aspect-ratio-object">
                    <x-root class="aspect-ratio-object" data-url="${chartUrl}" data-option=""></x-root>
                  </div>
                </div>
              </div>
            </div>
          `)}
        </div>
      </div>

      <div class="pane">
        <div class="flex flex-wrap justify-around w-100 items-center fill-parent">
          ${model.currentTab().charts.slice(0, 1).map(chartUrl => html`
            <div class="mo w-100">
              <div class="mo-card br3 bg-white m4 pv1">
                <div class="aspect-ratio aspect-ratio-16x9">
                  <div class="aspect-ratio-object">
                    <x-root class="aspect-ratio-object" data-url="${chartUrl}" data-option=""></x-root>
                  </div>
                </div>
              </div>
            </div>
          `)}
        </div>
        Coucou
      </div>
    </div>
    `;
  }
}

customElements.define('qc-folder', QCFolder);
