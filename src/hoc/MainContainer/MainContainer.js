import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import Backdrop from '../Backdrop/Backdrop';
import ContentWrapper from '../ContentWrapper/ContentWrapper';

import classes from './MainContainer.css';

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
                    type={this.state.siderCollapsed?'right-square' : 'menu-fold'}
                    style={this.state.siderCollapsed?{left:0}:{display: 'none'}}
                    onClick={this.siderController}
                />
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Hi wanderer <Icon type="smile" style={{ 'fontSize': 14 }} /> , here's what you're looking for...</Breadcrumb.Item>
                </Breadcrumb> */}
                <span style={{ color: '#ffffffab', margin: '16px 0' }}>Hi wanderer <Icon type="smile" style={{ 'color': '#ffffffab', 'fontSize': 14 }} /> , here's what you're looking for..</span>
                <ContentWrapper/>
            </Layout>
        )
    }
}

export default MainContainer;