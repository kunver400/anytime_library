import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper'
import SiderWrapper from '../SiderWrapper/SiderWrapper';
import FooterWrapper from '../FooterWrapper/FooterWrapper';
import MainContainer from '../MainContainer/MainContainer'
import classes from './LayoutContainer.css';



class LayoutContainer extends Component {

  render() {
    return (
      <Layout className={classes.top_layout}>
        <HeaderWrapper />

        <Layout>
          <SiderWrapper />
          <MainContainer />
        </Layout>

        <FooterWrapper />
      </Layout>
    );
  }
}

export default LayoutContainer;
