import React, { Component } from 'react'
import { Layout, Breadcrumb, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';

import Landing from '../../components/Landing/Landing';
import NotFound from '../../components/NotFound/NotFound';
import SignUp from '../../components/SignUp/SignUp';
import IndexedCollection from '../../components/IndexedCollection/IndexedCollection';

import classes from './ContentWrapper.css'
const { Content } = Layout;

class ContentWrapper extends Component {
    render() {
        return (
            <Content className={classes.content}>
                <Breadcrumb>
                <Breadcrumb.Item>
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>All Books</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>Indexed collection</span>
                </Breadcrumb.Item>
                </Breadcrumb>
                <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/indexofbooks" render={()=><IndexedCollection user={this.props.user}/>}/>
                <Route path="/" exact render={()=><Landing user={this.props.user}/>}/>
                <Route component={NotFound}/>
                </Switch>
            </Content>
        )
    }
}

export default ContentWrapper;