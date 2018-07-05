import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import classes from './HeaderWrapper.css'
import logo from '../../assets/book.svg'
const { Header } = Layout;
const { SubMenu, ItemGroup } = Menu;

class HeaderWrapper extends Component {
    render() {
        return (
            <Header className={classes.header}>
                <img src={logo} alt='na' className={classes.logo} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to="/"><Icon type="home" />Home</Link></Menu.Item>
                    <Menu.Item key="2"><span><Icon type="search" />Search</span></Menu.Item>
                    <SubMenu className={classes.menuitem_right} title={<Icon type="idcard" />}>
                        
                            {this.props.user ?
                                (
                                    <ItemGroup title='You' className={classes.light_item_group}>
                                    <Menu.Item key="user:1"><Icon type="user" />Profile</Menu.Item>
                                    <Menu.Item key="user:2"><a onClick={(e)=>{e.preventDefault(); this.props.logout()}}><Icon type="logout" />Logout</a></Menu.Item>
                                    </ItemGroup>
                                ) :
                                (
                                    <ItemGroup title='You' className={classes.light_item_group}>
                                    <Menu.Item key="4"><a onClick={(e) => { e.preventDefault(); this.props.login(true) }}><Icon type="login" />Login</a></Menu.Item>
                                    <Menu.Item key="5"><Link to='/signup'><Icon type="user-add" />Join us</Link></Menu.Item>
                                    </ItemGroup>
                                )
                            }                        
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default HeaderWrapper;