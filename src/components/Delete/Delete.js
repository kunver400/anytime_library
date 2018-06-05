import React, { Component } from 'react';
import { Modal, Button } from 'antd';
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
        let books = this.props.selectedBooks.map((item, index)=>{
            return (
                <li key={index}>
                    {item.title}
                </li>
            )
        });
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
            <div className={classes.message}>Following entries will be <span>annihilated</span>, mind your actions!</div>
            <ol>
            {books}
            </ol>
            <div style={{marginTop: '25px', textAlign: 'center'}}>
            <Button type='danger'>Confirm</Button>
            </div>
            </Modal>
        )
    }
}

export default Delete;