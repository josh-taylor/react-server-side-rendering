import React, {Component} from 'react';
import {Link} from 'react-router';

const App = ({ children }) => {
  return <section>
    <nav className="nav has-shadow">
      <div className="nav-left">
        <Link to="/" className="nav-item is-brand">
          Server Side Rendering
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About</Link>
      </div>
    </nav>

    <section className="section">
      <section className="container">{children}</section>
    </section>
  </section>
}

export default App;
