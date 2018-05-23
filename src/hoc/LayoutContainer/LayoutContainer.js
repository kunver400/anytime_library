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
    collapsed: window.innerWidth<992,
    loginVisible: false,
    user: null
  }
  toggleSider = () => {
      this.setState({collapsed: !this.state.collapsed})
      return !this.state.collapsed;
  }
  toggleLogin = (visible) => {
    if (visible !== this.state.loginVisible) {
      this.setState({
        loginVisible: visible
      });
    }
  }
  setUser = (user) => {
    this.setState({
      user: user
    });
    console.log(user);
  }
  logoutUser = () => {
    this.setState({
      user: null
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Layout className={classes.top_layout}>
          <HeaderWrapper login={this.toggleLogin} user={this.state.user} logout={this.logoutUser}/>

          <Layout>
            <SiderWrapper collapsed={this.state.collapsed} user={this.state.user}/>
            <MainContainer toggleSider={this.toggleSider} user={this.state.user}/>
          </Layout>

          <FooterWrapper />
          <Login visible={this.state.loginVisible} toggle={this.toggleLogin} setUser={this.setUser}/>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default LayoutContainer;
