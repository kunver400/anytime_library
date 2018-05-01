import React, { Component } from 'react';
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
      <Layout className={classes.top_layout}>
        <HeaderWrapper />

        <Layout>
          <SiderWrapper getToggle={this.getToggle} />
          <MainContainer toggleSider={this.toggleSider}/>
        </Layout>

        <FooterWrapper />
      </Layout>
    );
  }
}

export default LayoutContainer;
