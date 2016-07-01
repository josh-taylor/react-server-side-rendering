import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App';
import About from './containers/About';
import NoMatch from './containers/NoMatch';

export default (
    <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="*" component={NoMatch} />
    </Route>
)
