import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import IssueForm from './IssueForm/IssueForm';
import usermeta from './../../utils/usermeta';
import classes from './Issue.css'


class Issue extends Component {
    booksAdded = [];
    booksRedundant = [];
    issueBook_s = (abook, books) => {
        let book = (books || { pop: () => null }).pop();
        let anIssue = {
            bkey: abook ? this.props.selectedBook.key : book.key,
            units: abook?abook.units : book.units,
            rdate: abook? abook.rdate : book.rdate
        };
        usermeta.getIssuedBooks()
            .then((data) => {
                if ((data || {}).issuedBooks) {
                    if (
                        data.issuedBooks.findIndex((el) => {
                            return el.bkey === anIssue.bkey
                        }) === -1) {
                        data.issuedBooks.push(anIssue);
                        let newData = {};
                        newData[data.key] = {
                            issued: data.issuedBooks,
                            ukey: this.props.user.key
                        }
                        Axios.patch('issues.json', newData)
                            .then((response) => {
                                if (book) {
                                    this.booksAdded.push(book);
                                    if (books.length > 0) this.issueBook_s(null, books);
                                    else {
                                        this.popSuccessMultiple();
                                    }
                                }
                                else this.popSuccess(response)
                            })
                            .catch(this.handleError);
                    }
                    else {
                        if (book) {
                            this.booksRedundant.push(book);
                            if (books.length > 0) this.issueBook_s(null, books);
                            else {
                                this.popSuccessMultiple();
                            }
                        }
                        else this.popInfo();
                    }
                }
                else {
                    Axios.post('issues.json', {
                        ukey: this.props.user.key,
                        issued: [anIssue]
                    })
                        .then((response) => {
                            if (book) {
                                this.booksAdded.push(book);
                                if (books.length > 0) this.issueBook_s(null, books);
                                else {
                                    this.popSuccessMultiple();
                                }
                            }
                            else this.popSuccess(response)
                        })
                        .catch(this.handleError);
                }
            })
    }
    popSuccess = (response) => {
        Modal.success({
            title: 'Thanks for using our services.',
            content: 'Our associate will reach you shortly.',
        });
        this.props.ToggleIssueModal();
    }
    popSuccessMultiple = () => {
        Modal.success({
            title: 'Thanks for using our services.',
            content: (
                <div>
                <ul>
                    <li>Books issued successfully: {this.booksAdded.length} unit(s)</li>
                    <li>you've already issued: {this.booksRedundant.length} books</li>
                </ul>
                Our associate will reach you shortly.
                </div>
            )
        })
        this.props.ToggleIssueModal();
        this.booksAdded = [];
        this.booksRedundant = [];
    }
    popInfo = () => {
        Modal.info({
            title: "Redundant issue prohibited.",
            content: "you've already issued this book.",
        });
        this.props.ToggleIssueModal();
    }
    handleError = (response) => {
        console.log(response, 'something went wrong.');
    }
    render() {
        return (
            <Modal
                title="Issue"
                visible={this.props.issueVisible}
                onCancel={this.props.ToggleIssueModal}
                footer={null}
                className={classes.Issue_modal}
                okText="Confirm"
                style={{ top: 20 }}
            >
                <IssueForm {...this.props} handleSubmit={this.issueBook_s} />
            </Modal>
        )
    }
}

export default Issue;