import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import AddBookForm from './AddBookForm/AddBookForm';
import classes from './AddBook.css';


class AddBook extends Component {
    booksAdded = [];
    booksRedundant = [];
    AddBook = (data) => {
        console.log(data);
    }
    popSuccess = (response) => {
        Modal.success({
            title: 'Thanks for using our services.',
            content: 'Our associate will reach you shortly.',
        });
        this.props.hideAddBookModal();
    }
    popInfo = () => {
        Modal.info({
            title: "Redundant AddBook prohibited.",
            content: "you've already AddBookd this book.",
        });
        this.props.hideAddBookModal();
    }
    handleError = (response) => {
        console.log(response, 'something went wrong.');
    }
    render() {
        return (
            <Modal
                title="Add Book"
                visible={this.props.AddBookVisible}
                onCancel={this.props.ToggleAddBookModal}
                footer={null}
                className={classes.AddBook_modal}
                okText="Confirm"
                style={{ top: 20 }}
            >
                <AddBookForm {...this.props} handleSubmit={this.AddBook} />
            </Modal>
        )
    }
}

export default AddBook;