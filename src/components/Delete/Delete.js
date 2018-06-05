import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';

import classes from './Delete.css'

class Delete extends Component {
    deleted = [];
    failed = [];
    DeleteBooks = () => {
        new Promise((resolve, reject) => {
            this.props.selectedBooks.forEach((book) => {
                Axios.delete('books/' + book.key + '.json')
                    .then((response) => {
                        this.deleted.push(book);
                        if (this.deleted.length + this.failed.length === this.props.selectedBooks.length) resolve();
                    })
                    .catch((error) => {
                        this.failed.push(book);
                        if (this.deleted.length + this.failed.length === this.props.selectedBooks.length) resolve();
                    })
            });
        })
            .then(this.popSuccess)
    }
    popSuccess = (response) => {
        Modal.success({
            title: 'Operation completed.',
            content: (
                <div>
                    <span>Following entries this.deleted:</span>
                    <ol>
                        {this.deleted.map(book => <li key={book.key}>{book.title}</li>)}
                    </ol>
                </div>
            ),
        });
        this.props.ToggleDeleteModal();
        this.props.reloadTable();
        this.deleted = [];
        this.failed = [];
    }

    render() {
        let books = this.props.selectedBooks.map((item, index) => {
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
                <div style={{ marginTop: '25px', textAlign: 'center' }}>
                    <Button type='danger' onClick={this.DeleteBooks}>Confirm</Button>
                </div>
            </Modal>
        )
    }
}

export default Delete;