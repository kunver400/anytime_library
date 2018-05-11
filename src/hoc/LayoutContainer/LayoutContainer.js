import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Layout } from 'antd';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper'
import SiderWrapper from '../SiderWrapper/SiderWrapper';
import FooterWrapper from '../FooterWrapper/FooterWrapper';
import MainContainer from '../MainContainer/MainContainer'
import classes from './LayoutContainer.css';



class LayoutContainer extends Component {
  getToggle = (func) => {
    this.toggle = func;
  }
  toggleSider = () => {
    return this.toggle();
  };
  render() {
    return (
      <BrowserRouter>
      <Layout className={classes.top_layout}>
        <HeaderWrapper />

        <Layout>
          <SiderWrapper getToggle={this.getToggle} />
          <MainContainer toggleSider={this.toggleSider}/>
        </Layout>

        <FooterWrapper />
      </Layout>
      </BrowserRouter>
    );
  }
}

export default LayoutContainer;
