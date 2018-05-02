import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import Backdrop from '../Backdrop/Backdrop'

import classes from './MainContainer.css';

const { Content } = Layout;

class MainContainer extends Component {
    state = {
        siderCollapsed: window.innerWidth<992,
        backdrop: false
    };
    siderController = () => {
        let sider = this.props.toggleSider();
        this.setState({siderCollapsed: sider, backdrop: !sider});
    }
    render() {
        return (
            <Layout style={{ alignItems: 'center' }}>
            <Backdrop visible={this.state.backdrop} callback={this.siderController}/>            
                <Icon
                    className={classes.trigger}
                    type={this.state.siderCollapsed?'menu-unfold' : 'menu-fold'}
                    style={this.state.siderCollapsed?{left:0}:null}
                    onClick={this.siderController}
                />
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Hi wanderer <Icon type="smile" style={{ 'fontSize': 14 }} /> , here's what you're looking for...</Breadcrumb.Item>
                </Breadcrumb> */}
                <span style={{ color: '#ffffffab', margin: '16px 0' }}>Hi wanderer <Icon type="smile" style={{ 'color': '#ffffffab', 'fontSize': 14 }} /> , here's what you're looking for..</span>
                <Content className={classes.content}>
                    <div className={classes.landing_splash}>
                        <h1>Anytime</h1>
                        <h2>Anywhere</h2>
                        <p>The solo depot for all you will ever read.</p>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default MainContainer;