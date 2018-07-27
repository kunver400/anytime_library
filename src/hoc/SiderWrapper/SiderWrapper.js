import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './SiderWrapper.raw.css?raw';
const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderWrapper extends Component {

    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'subo1'];
    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        return (
            <Sider width={200} breakpoint="lg"
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                collapsedWidth="0"
                //onCollapse={(collapsed, type) => { console.log(collapsed, type,this); }}
                >
                <Menu theme='dark'
                    mode="inline"
                    //defaultSelectedKeys={['1']}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >

                    <SubMenu key="sub1" title={<span><Icon type="database" />All Books</span>}>
                        <Menu.Item key="1"><Link to='/tiledisplay/times_issued'>Most Issued</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/tiledisplay/date_added'>Fresh Arrivals</Link></Menu.Item>
                        <Menu.Item key="4"><Link to='/indexofbooks'>Indexed Collection</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="barcode" />My Books</span>}>
                        <Menu.Item key="5" disabled={!this.props.user}><Link to='/subscriptions'>Subscribed Authors</Link></Menu.Item>
                        <Menu.Item key="6" disabled={!this.props.user}><Link to='/issuedBooks'>Issued Books</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="team" />Social</span>}>
                        <Menu.Item key="9"><span style={{textDecoration:'line-through'}}>Chatrooms</span></Menu.Item>
                        <Menu.Item key="11"><span style={{textDecoration:'line-through'}}>Recommend a Book</span></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SiderWrapper;