import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import ROOT_ACTIONS from '../../redux/actions/root_actions';

import Login from '../../components/Login/Login';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper'
import SiderWrapper from '../SiderWrapper/SiderWrapper';
import FooterWrapper from '../FooterWrapper/FooterWrapper';
import MainContainer from '../MainContainer/MainContainer'
import classes from './LayoutContainer.css';



class LayoutContainer extends Component {
  state = {
    collapsed: window.innerWidth < 992
  }
  toggleSider = () => {
    this.setState({ collapsed: !this.state.collapsed })
    return !this.state.collapsed;
  }
  toggleLogin = (visible) => {
    if (visible !== this.props.loginVisible) {
      this.props.logipopupToggled(visible);
    }
  }
  setUser = (user) => {
    this.props.userLoggedIn(user);
    console.log(user);
  }
  logoutUser = () => {
    this.props.userLoggedOut();
  }
  render() {
    return (
      <BrowserRouter>
        <Layout className={classes.top_layout}>
          <HeaderWrapper login={this.toggleLogin} user={this.props.user} logout={this.logoutUser} />

          <Layout>
            <SiderWrapper collapsed={this.state.collapsed} user={this.props.user} />
            <MainContainer toggleSider={this.toggleSider} user={this.props.user} />
          </Layout>

          <FooterWrapper />
          <Login visible={this.props.loginVisible} toggle={this.toggleLogin} setUser={this.setUser} />
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginVisible: state.loginVisible,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
    return {
      logipopupToggled: (visible) => dispatch({type:ROOT_ACTIONS.TOGGLE_LOGIN_MODAL,visible: visible}),
      userLoggedIn: (user) => dispatch({type:ROOT_ACTIONS.LOG_USER_IN,user: user}),
      userLoggedOut: () => dispatch({type: ROOT_ACTIONS.LOG_USER_OUT})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer);
