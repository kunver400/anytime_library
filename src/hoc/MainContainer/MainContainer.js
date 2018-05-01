import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import classes from './MainContainer.css';

const { Content } = Layout;

class MainContainer extends Component {
    render() {
        return (
            <Layout style={{ padding: '0 12px 12px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Hi wanderer <Icon type="smile" style={{ 'fontSize': 14 }} /> , here's what you're looking for...</Breadcrumb.Item>
                </Breadcrumb> */}
                <span style={{color:'#ffffffab', margin: '16px 0' }}>Hi wanderer <Icon type="smile" style={{'color':'#ffffffab', 'fontSize': 14 }} /> , here's what you're looking for..</span>
                <Content>
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