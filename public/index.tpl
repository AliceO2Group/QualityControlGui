<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>QCG</title>
  <meta name="description" content="QualityControl interface for ROOT object of Alice O2">
  <meta name="author" content="Vladimir Kosmala">

  <link rel="stylesheet" href="https://vcap.me:8443/jsroot/style/JSRootPainter.css">
  <link rel="stylesheet" href="https://vcap.me:8443/bootstrap.css">

  <script>
    // Inject token access into javascript from server template engine
    window.token = "{{token}}";

    // Remove code from query string, allows refresh of the current page
    // because code can be used only one time
    (function() {
      const url = new URL(location);
      url.searchParams.delete('code');
      history.replaceState({}, '', url);
    })();
  </script>

  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->

  <style type="text/css">



      /* monitoring object (mo) */
      .mo {  }
      .mo-card {  }
      .mo-graph { width: 100px; height: 100px; display: block; }
  </style>
</head>

<body class="scroll-off">

<script type="text/javascript" src="/jsroot/scripts/JSRootCore.js"></script>
<script type="text/javascript" src="/jsroot/scripts/d3.min.js"></script>
<script type="text/javascript" src="/jsroot/scripts/JSRootPainter.js"></script>
<script type="text/javascript" src="/jsroot/scripts/JSRootPainter.hist.js"></script>

<script type="text/javascript" src="/api/module/nanomorph?token={{token}}"></script>
<script type="text/javascript" src="/api/module/bel?token={{token}}"></script>
<script type="text/javascript" src="/api/module/hyperx?token={{token}}"></script>
<script type="text/javascript" src="/api/module/mithril?token={{token}}"></script>

<script>
  // Imports

  window.morph = require('nanomorph');
  window.bel = require('bel');
  window.hyperx = require('hyperx');
  window.mithril = require('mithril');

  window.html = hyperx(mithril);
  window.render = mithril.render;
</script>

<script type="text/javascript" src="/app/Observable.class.js"></script>
<script type="text/javascript" src="/app/Router.class.js"></script>
<script type="text/javascript" src="/app/Model.class.js"></script>
<script type="text/javascript" src="/app/ObjectTree.class.js"></script>
<script type="text/javascript" src="/app/jsroot.view.js"></script>
<script type="text/javascript" src="/app/qc-header.js"></script>
<script type="text/javascript" src="/app/qc-sidebar.js"></script>
<script type="text/javascript" src="/app/qc-folder.js"></script>
<script type="text/javascript" src="/app/qc-collections.js"></script>
<script type="text/javascript" src="/app/qc-collection.js"></script>
<script type="text/javascript" src="/app/qc-objects.js"></script>
<script type="text/javascript" src="/app/body.view.js"></script>

<script>

  // Controller

  window.model = new Model();

  mount(model, document.body, e => html`${QCGView(model)}`);

  function mount(model, targetElement, viewFn) {
    var requestFrame;
    model.observe(e => {
      if (requestFrame) {
        cancelAnimationFrame(requestFrame);
      }
      requestFrame = requestAnimationFrame(e => {
        render(targetElement, viewFn(model));
      });
    });
    model.notify();
  }
</script>

<!--
<div class="layout-header flex justify-between items-center bg-light-gray bb b-moon-gray">
  <div class="tl ph1">
    <button class="f5 bn bg-white black">select</button>
    <button class="f5 bn bg-white black">select</button>
    <button class="f5 bn bg-white black">select</button>
  </div>
  <div class="tc ph1">
    <button class="f5 bn bg-white black">select</button>
    <button class="f5 bn bg-white black">select</button>
    <button class="f5 bn bg-white black">select</button>
  </div>
  <div class="tr ph1">
    <button class="f5 bn bg-white black">select</button>
    <button class="f5 bn bg-white black">select</button>
    <button class="f5 bn bg-white black">select</button>
  </div>
</div>
<div class="layout-content flex">
  <div class="layout-sidebar bg-light-gray br b-moon-gray"></div>
  <div class="layout-main"></div>
</div>
<div class="layout-footer bg-light-gray bt b-moon-gray"></div>
-->


<script>
JSROOT.gStyle.AutoStat = false;
JSROOT.gStyle.ContextMenu = true;
JSROOT.gStyle.CanEnlarge = false;
JSROOT.gStyle.DragAndDrop = false;
JSROOT.gStyle.DragAndDrop = false;
JSROOT.gStyle.DragAndDrop = false;
// JSROOT.gStyle.MoveResize = false; // div 2
JSROOT.gStyle.ToolBar = false;
JSROOT.gStyle.ZoomWheel = false;

JSROOT.gStyle.fFrameLineColor = 16;


// var els = document.querySelectorAll('.mo-graph');
// els.forEach(el => histogram(el));

// var token = "{{token}}"; // template variable

// const params = new URLSearchParams();
// params.set('token', token);
// params.set('agentName', 'daqTask');
// params.set('objectName', 'PayloadSizeSubBlocks');
// fetch('/api/retrieve?' + params.toString(), {method: 'POST'})
//   .then(res => res.text())
//   .then(txt => JSROOT.parse(txt))
//   .then(obj => {
//     JSROOT.draw("drawing", obj);
//   });
</script>

</body>
</html>

<script type="text/javascript">
function retrieve() {
  const params = new URLSearchParams();
  params.set('token', token);
  params.set('agentName', 'daqTask');
  params.set('objectName', 'PayloadSizeSubBlocks');

  return fetch('/api/retrieve?' + params.toString(), {method: 'POST'})
    .then(res => res.text())
    .then(txt => JSROOT.parse(txt));
}

// var i = 1;
// retrieve('daqTask', 'PayloadSizeSubBlocks').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('daqTask', 'numberSubBlocks').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('daqTask', 'objectsList').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('daqTask', 'payloadSize').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('daqTask', 'IDs').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));

// retrieve('myTask_1', 'array-0').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('myTask_1', 'array-1').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('myTask_1', 'array-2').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// retrieve('myTask_1', 'array-3').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-4').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-5').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-6').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-7').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-8').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-9').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-10').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-11').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-12').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-13').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-14').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-15').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));
// // retrieve('myTask_1', 'array-16').then(obj => JSROOT.redraw(document.querySelectorAll('.mo-graph')[i++], obj));


</script>
