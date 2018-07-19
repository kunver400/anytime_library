import React, { Component } from 'react'
import { Layout, Breadcrumb, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom';

import Landing from '../../components/Landing/Landing';
//import FreshArrivals from '../../components/FreshArrivals/FreshArrivals';
import NotFound from '../../components/NotFound/NotFound';

import AsyncLoader from '../AsyncLoader/AsyncLoader';
import classes from './ContentWrapper.css'

const { Content } = Layout;
const AsyncIndexedCollection = AsyncLoader(() => {
    return import('../../components/IndexedCollection/IndexedCollection');
})
const AsyncIssuedBooks = AsyncLoader(() => {
    return import('../../components/IssuedBooks/IssuedBooks');
})
const AsyncSignUp = AsyncLoader(() => {
    return import('../../components/SignUp/SignUp');
})
const AsyncSubscribedAuthors = AsyncLoader(()=>{
    return import('../../components/SubscribedAuthors/SubscribedAuthors');
})

const AsyncFreshArrivals = AsyncLoader(()=>{
    return import('../../components/FreshArrivals/FreshArrivals');
})

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
                    <Route path="/subscriptions" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item><span>My Books</span></Breadcrumb.Item>
                        <Breadcrumb.Item><span>Subscribed Authors</span></Breadcrumb.Item></Breadcrumb>
                    } />
                    <Route path="/fresharrivals" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item><span>All Books</span></Breadcrumb.Item>
                        <Breadcrumb.Item><span>Fresh Arrivals</span></Breadcrumb.Item>
                    </Breadcrumb>
                    } />
                    <Route path="/" render={() => <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item></Breadcrumb>
                    } />
                </Switch>

                <Switch>
                    <Route path="/signup" component={AsyncSignUp} />
                    <Route path="/indexofbooks/:search" render={() => <AsyncIndexedCollection user={this.props.user} />} />
                    <Route path="/indexofbooks/" render={() => <AsyncIndexedCollection user={this.props.user} />} />
                    <Route path="/issuedbooks" render={() => <AsyncIssuedBooks user={this.props.user} />} />
                    <Route path="/subscriptions" render={() => <AsyncSubscribedAuthors user={this.props.user} />} />
                    <Route path="/fresharrivals" exact render={() => <AsyncFreshArrivals user={this.props.user} />} />
                    <Route path="/" exact render={() => <Landing user={this.props.user} />} />
                    <Route component={NotFound} />
                </Switch>
            </Content>
        )
    }
}

export default ContentWrapper;