import React, { Component } from 'react';
import classes from './Layout.css';

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <header className={classes.Layoutheader}>
          <h1 className={classes.Layouttitle}>Welcome to React</h1>
        </header>
        <p className={classes.Layoutintro}>
          React init.
        </p>
      </div>
    );
  }
}

export default Layout;
