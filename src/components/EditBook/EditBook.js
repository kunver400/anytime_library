import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import EditBookForm from './EditBookForm/EditBookForm';
import classes from './EditBook.css';


class EditBook extends Component {
    booksAdded = [];
    booksRedundant = [];
    EditBook = (data) => {
        let newbook = {};
        newbook[this.props.book.key] = {
            title: data.title,
            author: data.author,
            desc: data.desc,
            availablity: data.units,
            date_added: data.date,
            times_issued: 0,
            cover: data.cover
        };
        Axios.patch('books.json',newbook)
        .then((response)=>{this.popSuccess(response, data)})
        .catch(this.handleError)
    }
    popSuccess = (response, data) => {
        Modal.success({
            title: 'Book updated.',
            content: data.title+': was updated in place',
        });
        this.props.reloadTable();
            this.props.ToggleEditBookModal();
    }
    handleError = (response) => {
        console.log(response, 'something went wrong.');
    }
    render() {
        return (
            <Modal
                title="Edit Book"
                visible={this.props.EditBookVisible}
                onCancel={this.props.ToggleEditBookModal}
                footer={null}
                className={classes.EditBook_modal}
                okText="Confirm"
                style={{ top: 20 }}
            >
                <EditBookForm {...this.props} handleSubmit={this.EditBook} />
            </Modal>
        )
    }
}

export default EditBook;