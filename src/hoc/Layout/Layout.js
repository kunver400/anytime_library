import React, { Component } from 'react';
import {DatePicker} from 'antd';
import classes from './Layout.css';

class Layout extends Component {
  datechange = (a,b) => {
    console.log(a,b);
  };
  render() {
    return (
      <div className={classes.Layout}>
        <header className={classes.Layoutheader}>
          <h1 className={classes.Layouttitle}>Welcome to React</h1>
        </header>
        <p className={classes.Layoutintro}>
          React init.
          <DatePicker onChange={this.datechange}/>
        </p>
      </div>
    );
  }
}

export default Layout;
