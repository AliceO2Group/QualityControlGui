// Doc: https://github.com/winstonjs/winston/tree/2.x
const winston = require('winston');
const log = new winston.Logger({
  transports: [
    new winston.transports.Console(
      {timestamp: true, colorize: true}
    )
  ],
  exitOnError: true
});

const HttpServer = require('@aliceo2/aliceo2-gui').HttpServer;
const Response = require('@aliceo2/aliceo2-gui').Response;
const mysql = require('mysql');
const fs = require('fs');
const model = require('./lib/QCModel.js');
const config = require('./config.js');

// Not working
const log2 = require('@aliceo2/aliceo2-gui').Log;
log2.configure({
  winston: {
    transports: [
      new winston.transports.Console(
        {timestamp: true, colorize: true}
      )
    ],
    exitOnError: true
  }
});

// process.once('uncaughtException', function(e) {
//   if (e.code === 'EADDRINUSE') {
//     log.error('Port is already used');
//   }

//   log.error(e.stack || e);
//   process.exit(1);
// });

// Quick check config at start
log.info('HTTP full link: \t%s',
  `http://${config.http.hostname}:${config.http.port}`);
log.info('HTTPS full link: \t%s',
  `https://${config.http.hostname}:${config.http.portSecure}`);
log.info('TObject2JSON URL: \t%s',
  `${config.tobject2json.endpoint}`);

// Start servers
const http = new HttpServer(config.http, config.jwt, config.oAuth);

// Retrieve a TObject from the TObject2JSON server
// and send it to client
http.post('/retrieve', function(req, res) {
  const agentName = req.query.agentName;
  const objectName = req.query.objectName;

  if (!agentName || !objectName) {
    return res.status(400).send('Two parameters are needed (agentName and objectName)');
  }

  model.retrieve('daqTask', 'PayloadSizeSubBlocks')
    .then(json => res.status(json ? 200 : 404).send(json)) // already serialized
    .catch(err => res.status(500).send(err));
});


// Hack to load modules, subject to improvement
// bel, hyperx, mithril
http.get('/module/:module', function(req, res) {
  var browserify = require('browserify');
  browserify({require: req.params.module, debug: true}).bundle().pipe(res)
});

// Hack to exposes some libs assets libs, subject to improvement
// for example jsroot has scripts and css with its own loader (no require()),
// so it needs full exposure of its folder
http.exposeAssets = function(webPath, localPath) {
  const express = require('express');
  const path = require('path');
  const absolutePath = path.join(__dirname, localPath);
  log.info('Exposing: "%s" on "%s"', absolutePath, webPath);
  this.app.use(webPath, express.static(absolutePath));
};
http.exposeAssets('/jsroot', 'node_modules/jsroot');
