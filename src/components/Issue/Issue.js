import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import IssueForm from './IssueForm/IssueForm';
import usermeta from './../../utils/usermeta';
import classes from './Issue.css'


class Issue extends Component {
    issueBook = (units) => {
        let anIssue = {
            bkey: this.props.selectedBook.key,
            units: units
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
                            .then(this.popSuccess)
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    else {
                        Modal.info({
                            title: "Redundant issue prohibited.",
                            content: "you've already issued this book.",
                        });
                    }
                }
                else {
                    Axios.post('issues.json', {
                        ukey: this.props.user.key,
                        issued: [anIssue]
                    })
                        .then(this.popSuccess)
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            })
    }
    popSuccess = (response) => {
        Modal.success({
            title: 'Thanks for using our services.',
            content: 'Our associate will reach you shortly.',
        });
    }
    render() {
        return (
            <Modal
                title="Issue"
                visible={this.props.issueVisible}
                onCancel={this.props.bookIssueModal}
                footer={null}
                className={classes.Issue_modal}
                okText="Confirm"
            >
                <IssueForm {...this.props} handleSubmit={this.issueBook} />
            </Modal>
        )
    }
}

export default Issue;