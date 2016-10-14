import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import About from './containers/About';
import Index from './containers/Index';
import NoMatch from './containers/NoMatch';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="about" component={About} />
        <Route path="*" component={NoMatch} />
    </Route>
)
