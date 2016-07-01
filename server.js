import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './app/containers/Root';
import routes from './app/routes';
import createStore from './app/store/configure-store';

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const store = createStore();

            const history = syncHistoryWithStore(renderProps.history, store);

            const html = renderToString(
                <Root store={store} history={history}/>
            );

            const initialState = store.getState();

            renderFullPage(html, initialState);
        } else {
            res.status(404).send('Not found');
        }
    });
});

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Server Side Rendering Test</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
                <script src="/js/app.js"></script>
            </body>
        </html>
    `;
}

module.exports = app;
