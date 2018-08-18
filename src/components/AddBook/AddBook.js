import React, { Component } from "react";
import { Modal } from "antd";
import Axios from "axios";

import AddBookForm from "./AddBookForm/AddBookForm";
import classes from "./AddBook.css";


class AddBook extends Component {
    booksAdded = [];
    booksRedundant = [];
    AddBook = (data) => {
        Axios.post("books.json",{
            title: data.title,
            author: data.author,
            desc: data.desc,
            availablity: data.units,
            date_added: data.date,
            times_issued: 0,
            cover: data.cover
        })
            .then((response)=>{this.popSuccess(response, data);})
            .catch(this.handleError);
    }
    popSuccess = (response, data) => {
        Modal.success({
            title: "Book Added.",
            content: data.title+": added to the collection",
        });
        this.props.reloadTable({force: true});
        this.props.ToggleAddBookModal();
    }
    handleError = (response) => {
        console.log(response, "something went wrong.");
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
        );
    }
}

export default AddBook;