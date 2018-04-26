import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.Appheader}>
          <img src={logo} className={classes.Applogo} alt="logo" />
          <h1 className={classes.Apptitle}>Welcome to React</h1>
        </header>
        <p className={classes.Appintro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
