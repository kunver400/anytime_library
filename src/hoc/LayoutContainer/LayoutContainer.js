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
  toggleSider = () => {
    this.props.sidderToggled();
    return !this.props.collapsed;
  }
  toggleLogin = (visible) => {
    if (visible !== this.props.loginVisible) {
      this.props.logipopupToggled(visible);
    }
  }
  setUser = (user) => {
    this.props.userLoggedIn(user);
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
            <SiderWrapper collapsed={this.props.collapsed} user={this.props.user} />
            <MainContainer toggleSider={this.toggleSider} siderState={this.props.collapsed} user={this.props.user} />
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
    user: state.user,
    collapsed: state.collapsed
  }
}
const mapDispatchToProps = dispatch => {
    return {
      logipopupToggled: (visible) => dispatch({type:ROOT_ACTIONS.TOGGLE_LOGIN_MODAL,visible: visible}),
      userLoggedIn: (user) => dispatch({type:ROOT_ACTIONS.LOG_USER_IN,user: user}),
      userLoggedOut: () => dispatch({type: ROOT_ACTIONS.LOG_USER_OUT}),
      sidderToggled: () => dispatch({type: ROOT_ACTIONS.TOGGLE_SIDER})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer);
