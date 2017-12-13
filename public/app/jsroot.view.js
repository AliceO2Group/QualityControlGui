class Element extends HTMLElement {
  static get observedAttributes() { return ['data-url', 'data-option']; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this.render();
  }

  render() {
    if (!this.dataset.url) {
      throw new DOMException('x-root needs data-url attribute');
    }

    this.retrieve(this.dataset.url)
      .then(obj => {
        JSROOT.redraw(this, obj, this.dataset.option);
      });
  }

  retrieve(url) {
    JSROOT.cleanup(this);
    return fetch(url, {method: 'POST'})
      .then(res => res.text())
      .then(txt => JSROOT.parse(txt));
  }
}
customElements.define('x-root', Element);

var button = {
  onclick: function(e) {
    console.log('click !');
  },
  view: function() {
    return html`<button onclick=${this.onclick}>click</button>`;
  }
};

function button2(model) {
  return html`<button onmousemove=${model.inc}>inc ${model.count()}</button>`;
}

function createHisto(vnode) {
  histogram(vnode.dom);
}

function rootobject(number) {
  var node = html`<div class="mo-graph" key="key${number}" id="id${number}" oncreate=${createHisto}></div>`;
  return node;
}

function drawRootObj(el, obj) {
  return JSROOT.draw(el, obj, 'colz');
}

function cleanRootObj(el) {
  JSROOT.cleanup(el);
}

function randomHisto() {
  var cnt = 0;
  var histo = JSROOT.CreateTH2(20, 20);

  for (var iy=0;iy<20;iy++) {
    for (var ix=0;ix<20;ix++) {
       var bin = histo.getBin(ix+1, iy+1), val = 0;
       switch (cnt % 4) {
          case 1: val = ix + 19 - iy; break;
          case 2: val = 38 - ix - iy; break;
          case 3: val = 19 - ix + iy; break;
          default: val = ix + iy; break;
       }
       histo.setBinContent(bin, val);
    }
  }

  return histo;
}

