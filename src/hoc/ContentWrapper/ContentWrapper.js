import React, { Component } from 'react'
import { Layout, Breadcrumb, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';

import Landing from '../../components/Landing/Landing';
import NotFound from '../../components/NotFound/NotFound';
import SignUp from '../../components/SignUp/SignUp';
import IndexedCollection from '../../components/IndexedCollection/IndexedCollection';
import IssuedBooks from '../../components/IssuedBooks/IssuedBooks';

import classes from './ContentWrapper.css'
const { Content } = Layout;

class ContentWrapper extends Component {
    render() {
        return (
            <Content className={classes.content}>

                <Switch>
                    <Route path="/signup" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item><span>Join us</span></Breadcrumb.Item></Breadcrumb>
                    } />
                    <Route path="/indexofbooks" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item><span>All Books</span></Breadcrumb.Item>
                        <Breadcrumb.Item><span>Indexed collection</span></Breadcrumb.Item></Breadcrumb>
                    } />
                    <Route path="/issuedbooks" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item><span>My Books</span></Breadcrumb.Item>
                        <Breadcrumb.Item><span>Issued Books</span></Breadcrumb.Item></Breadcrumb>
                    } />
                    <Route path="/" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item></Breadcrumb>
                    } />
                </Switch>

                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/indexofbooks" render={() => <IndexedCollection user={this.props.user} />} />
                    <Route path="/issuedbooks" render={() => <IssuedBooks user={this.props.user} />} />
                    <Route path="/" exact render={() => <Landing user={this.props.user} />} />
                    <Route component={NotFound} />
                </Switch>
            </Content>
        )
    }
}

export default ContentWrapper;