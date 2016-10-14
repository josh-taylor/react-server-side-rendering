import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from './app/routes';
import configureStore from './app/store/configure-store';

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathName + redirectLocation.search)
      } else if (renderProps) {
        const store = configureStore({
          todos: [{
            name: 'Work out server side rendering'
          }, {
            name: 'Write an awesome app'
          }]
        });

        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        res.status(200).send(renderFullPage(html, store.getState()))
      } else {
        res.status(404).send('Not Found')
      }
    });
});

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Server Side Rendering Test</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.2.1/css/bulma.min.css" rel="stylesheet" type="text/css">
            </head>
            <body>
                <div id="root">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};
                </script>
                <script src="/js/app.js"></script>
            </body>
        </html>
    `;
}

module.exports = app;
