import React, { Component } from "react";
import { Layout, Icon} from "antd";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

import classes from "./MainContainer.css";

class MainContainer extends Component {
    state = {
        backdrop: false
    };
    siderController = () => {
        let sider = this.props.toggleSider();
        this.setState({backdrop: !sider});
    }
    render() {
        return (
            <Layout>
                <Backdrop visible={this.state.backdrop} callback={this.siderController}/>
                <Spinner visible={this.props.spinnyVisible}/>             
                <Icon
                    className={classes.trigger}
                    type={this.props.siderState?"right-square" : "menu-fold"}
                    style={this.props.siderState?null:{display: "none"}}
                    onClick={this.siderController}
                />
                <ContentWrapper user={this.props.user} setUser={this.props.setUser}/>
            </Layout>
        );
    }
}

export default MainContainer;