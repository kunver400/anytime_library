import React from "react";
import { Modal } from "antd";
import LoginForm from "./LoginForm/LoginForm";
import classes from "./Login.css";


const Login = (props) => {
    return (
        <Modal
            title="Login"
            visible={props.visible}
            onCancel={() => props.toggle(false)}
            footer={null}
            className={classes.login_modal}
        >
            <LoginForm toggleModal={props.toggle} {...props} />
        </Modal>
    );
};

export default Login;