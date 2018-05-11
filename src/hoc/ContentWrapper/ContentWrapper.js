import React, { Component } from 'react'
import { Layout } from 'antd';
import Landing from '../../components/Landing/Landing'
import classes from './ContentWrapper.css'
const { Content } = Layout;

class ContentWrapper extends Component {
    render() {
        return (
            <Content className={classes.content}>
            <Landing/>
            </Content>
        )
    }
}

export default ContentWrapper;