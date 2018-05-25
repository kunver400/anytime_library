import React, { Component } from 'react';
import { Modal } from 'antd';
import Axios from 'axios';
import IssueForm from './IssueForm/IssueForm';
import classes from './Issue.css'


class Issue extends Component {
    issueBook = (data) => {
      Axios.get('/user.json')
        .then(response => {

        })
        .catch(response => {
          console.log(response);
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
            <IssueForm {...this.props} handleSubmit={this.issueBook}/>
            </Modal>
        )
    }
}

export default Issue;