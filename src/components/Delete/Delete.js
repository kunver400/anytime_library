import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import classes from './Delete.css'


class Delete extends Component {
    popSuccess = (response) => {
        Modal.success({
            title: 'Thanks for using our services.',
            content: 'Our associate will reach you shortly.',
        });
        this.props.ToggleDeleteModal();
    }

    handleError = (response) => {
        console.log(response, 'something went wrong.');
    }
    render() {
        return (
            <Modal
                title="Delete"
                visible={this.props.deleteVisible}
                onCancel={this.props.ToggleDeleteModal}
                footer={null}
                className={classes.Delete_modal}
                okText="Confirm"
                style={{ top: 20 }}
            >
            </Modal>
        )
    }
}

export default Delete;