import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Login from '../../components/Login/Login';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper'
import SiderWrapper from '../SiderWrapper/SiderWrapper';
import FooterWrapper from '../FooterWrapper/FooterWrapper';
import MainContainer from '../MainContainer/MainContainer'
import classes from './LayoutContainer.css';



class LayoutContainer extends Component {
  state = {
    loginVisible: false
  }
  getToggle = (func) => {
    this.toggle = func;
  }
  toggleSider = () => {
    return this.toggle();
  };
  toggleLogin = (visible) => {
    if (visible !== this.state.loginVisible) {
      this.setState({
        loginVisible: visible
      });
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Layout className={classes.top_layout}>
          <HeaderWrapper login={this.toggleLogin}/>

          <Layout>
            <SiderWrapper getToggle={this.getToggle} />
            <MainContainer toggleSider={this.toggleSider} />
          </Layout>

          <FooterWrapper />
          <Login visible={this.state.loginVisible} toggle={this.toggleLogin}/>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default LayoutContainer;
