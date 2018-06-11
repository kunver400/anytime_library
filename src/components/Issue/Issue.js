import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import IssueForm from './IssueForm/IssueForm';
import usermeta from './../../utils/usermeta';
import classes from './Issue.css'


class Issue extends Component {
    booksAdded = [];
    booksReissued = [];
    booksFailed = [];
    issueBook_s = (abook, books) => {
        let book = (books || { shift: () => null }).shift();
        let anIssue = {
            bkey: abook ? this.props.selectedBook.key : book.key,
            units: abook ? abook.units : book.units,
            rdate: abook ? abook.rdate : book.rdate
        };
        usermeta.getIssuedBooks()
            .then((data) => {
                if ((data || {}).issuedBooks) {
                    if (
                        data.issuedBooks.findIndex((el) => {
                            return el.bkey === anIssue.bkey
                        }) === -1) { // append to the exisiting list
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
                    else { // extend issue date (Reissue)
                        if (this.props.reissue) {
                            let newIssued = data.issuedBooks.map(issue => {
                                if (issue.bkey === anIssue.bkey) {
                                    issue.rdate = anIssue.rdate;
                                }
                                return issue;
                            })
                            Axios.patch('issues/' + data.key + '.json', { issued: newIssued, ukey: this.props.user.key })
                                .then((response) => {
                                    if (book) { //incase reissue func. required else where
                                        this.booksReissued.push(book);
                                        if (books.length > 0) this.issueBook_s(null, books);
                                        else {
                                            this.popSuccessMultiple();
                                        }
                                    }
                                    else this.popInfo(response)
                                })
                                .catch(this.handleError);
                        }
                        else {
                            if (book) {
                                this.booksFailed.push(book);
                                if (books.length > 0) this.issueBook_s(null, books);
                                else this.popSuccessMultiple();
                            }
                            else this.popInfo();
                        }
                    }
                }
                else { //create issues object for user
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
        this.props.reload && this.props.reload();
        this.props.ToggleIssueModal();
    }
    popSuccessMultiple = () => {
        Modal.success({
            title: 'Thanks for using our services.',
            content: (
                <div>
                    <ul>
                        {this.booksAdded.length>0?<li>Books issued successfully: {this.booksAdded.length} unit(s)</li>:null}
                        {this.booksReissued.length > 0 ? <li>Books re-issued successfully: {this.booksReissued.length} books</li> : null}
                        {this.booksFailed.length > 0 ? <li>Books re-issue required for: {this.booksFailed.length} books</li> : null}
                    </ul>
                    Our associate will reach you shortly.
                </div>
            )
        })
        this.props.ToggleIssueModal();
        this.props.reload && this.props.reload();
        this.booksAdded = [];
        this.booksFailed = [];
        this.booksReissued = [];
    }
    popInfo = () => {
        Modal.info({
            title: "Book already issued.",
            content: "Please use the re-issue feature.",
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