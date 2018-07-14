import React, { Component } from 'react';
import { List } from 'antd';
import {Link} from 'react-router-dom';
import Subscribe from '../Subscribe/Subscribe';
import classes from './SubscribedAuthors.css';

class SubscribedAuthors extends Component {
    state = {
        data: [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ]
    }
    componentDidMount() {
        if (this.props.user.subs && this.props.user.subs.length > 0) {
            this.setState({
                data: this.props.user.subs
            })
        }
    }
    render() {
        return (
            <div className={classes.list_container}>
                <List
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item
                            actions={[<Subscribe book={{ author: item }} user={this.props.user} />]}
                        >
                            <List.Item.Meta
                                title={<Link to={'/indexofbooks/'+item}>{item}</Link>}
                            />
                        </List.Item>)}
                />
            </div>
        )
    }
}

export default SubscribedAuthors;