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
    collapsed: window.innerWidth < 992,
    user: {
      "email": "usdi@ss.com",
      "nickname": "nickfanchuli",
      "password": "qwe",
      "phone": "+864234234234",
      "residence": ["zhejiang", "hangzhou", "xihu"],
      "website": "bobo.bo",
      "isAdmin": true
    }
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
          <HeaderWrapper login={this.toggleLogin} user={this.state.user} logout={this.logoutUser} />

          <Layout>
            <SiderWrapper collapsed={this.state.collapsed} user={this.state.user} />
            <MainContainer toggleSider={this.toggleSider} user={this.state.user} />
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
    loginVisible: state.loginVisible
  }
}
const mapDispatchToProps = dispatch => {
    return {
      logipopupToggled: (visible) => dispatch({type:ROOT_ACTIONS.TOGGLE_LOGIN_MODAL,visible: visible})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LayoutContainer);
