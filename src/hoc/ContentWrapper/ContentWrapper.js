import React, { Component } from 'react'
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import Landing from '../../components/Landing/Landing';
import NotFound from '../../components/NotFound/NotFound';
import SignUp from '../../components/SignUp/SignUp';

import classes from './ContentWrapper.css'
const { Content } = Layout;

class ContentWrapper extends Component {
    render() {
        return (
            <Content className={classes.content}>
                <Switch>
                <Route path="/signup" exact component={SignUp} />
                    <Route path="/" exact render={()=><Landing user={this.props.user}/>}/>
                    <Route component={NotFound}/>
                </Switch>
            </Content>
        )
    }
}

export default ContentWrapper;