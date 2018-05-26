import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';

import IssueForm from './IssueForm/IssueForm';
import usermeta from './../../utils/usermeta';
import classes from './Issue.css'


class Issue extends Component {
    issueBook = (units) => {
        usermeta.getIssuedBooks()
            .then((data) => {
                if (data) {
                    console.log(data)
                }
                else {
                    Axios.post('issues.json', {
                        ukey: this.props.user.key,
                        issued: [{
                            bkey: this.props.selectedBook.key,
                            units: units
                        }]
                    })
                        .then(function (response) {
                            Modal.success({
                                title: 'Congratulations, you are a memeber now.',
                                content: 'Please login and continue.',
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            })
    }
    render() {
        return (
            <Modal
                title="Issue"
                visible={this.props.issueVisible}
                onCancel={this.props.issuepopupToggled}
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