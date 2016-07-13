"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');

// ****************** READ THIS, TEAM IMPERIO!! *************************
// Uncomment or edit these lines to refer to the desired library version:
// **********************************************************************
// Path to npm module:
// const imperio = require('imperio')(server);
// Path to local (in-development) version of the repository
const imperio = require('./../../imperio/index.js')(server);

// ****************** READ THIS, TEAM IMPERIO!! *************************
// You need to adjust the path to the desired front-end build, like above
//  Should lead to the ROOT directory of the imperio library (not /dist)
// **********************************************************************
// Path to npm module:
// app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
// Path to local (in-development) version of the repository
// Searches this library first for all static files and if it is not found there
// then it searches the next satic file....and  on and on and on
app.use(express.static(path.join(`${__dirname}/../../imperio`)));


/* ----------------------------------
 * -----   Global Middleware   ------
 * ---------------------------------- */

app.use(express.static(path.join(`${__dirname}/../client`)));
app.set('view engine', 'ejs');
app.use(imperio.init());

/* ----------------------------------
 * --------      Routes      --------
 * ---------------------------------- */

 // App will serve up different pages for client & desktop
 app.get('/',
   (req, res) => {
     if (req.useragent && req.useragent.isDesktop) {
       res.render(path.join(`${__dirname}/../client/browser`));
       // res.render(`../client/browser.html`);
     } else if (req.useragent && req.useragent.isMobile) {
       // TODO if token is on request, sent to tap in appropriate room
       res.render(`${__dirname}/../client/mobileSecurityPage`, { error: null });
       // res.sendFile(path.join(`${__dirname}/../client/mobile.html`));
     }
   }
 );

app.post('/',
  (req, res) => {
    if (req.useragent && req.useragent.isMobile) {
      // TODO Validate nonce match, if it doesn't, serve rootmobile
      console.log(req.imperio);
      if (req.imperio.connected) {
        res.render(`${__dirname}/../client/mobileSwipePage`, { error: null });
      } else {
        res.render(`${__dirname}/../client/mobileSecurityPage`, { error: null });
      }
    } else {
      res.status(404)
         .render(`${__dirname}/../client/mobileSecurityPage`, { error: 'NO POST' });
    }
  }
);

// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render('./../client/404');
});

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});
