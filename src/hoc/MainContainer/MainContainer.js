import React, { Component } from 'react';
import { Layout, Breadcrumb, Icon } from 'antd';

import classes from './MainContainer.css';

const { Content } = Layout;

class MainContainer extends Component {
    render() {
        return (
            <Layout style={{ padding: '0 12px 12px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Hi wanderer <Icon type="smile" style={{ 'fontSize': 14 }} /> , here's what you're looking for...</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ margin: 0, minHeight: 600 }}>
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