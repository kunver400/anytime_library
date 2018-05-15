import React, { Component } from 'react';
import { Modal } from 'antd';
import LoginForm from './LoginForm/LoginForm';
import classes from './Login.css'


class Login extends Component {
    render() {
        return (
            <Modal
                title="Login"
                visible={this.props.visible}
                onCancel={() => this.props.toggle(false)}
                footer={null}
                className={classes.login_modal}
            >
            <LoginForm toggleModal={this.props.toggle} setUser={this.props.setUser}/>
            </Modal>
        )
    }
}

export default Login;