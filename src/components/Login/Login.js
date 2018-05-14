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
                onOk={() => this.props.toggle(false)}
                onCancel={() => this.props.toggle(false)}
                footer={null}
                className={classes.login_modal}
                // style={{maxWidth: '350px',margin: 'auto'}}
            >
            <LoginForm/>
            </Modal>
        )
    }
}

export default Login;