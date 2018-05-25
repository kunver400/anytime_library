import React, { Component } from 'react';
import { Modal } from 'antd';
import IssueForm from './IssueForm/IssueForm';
import classes from './Issue.css'


class Issue extends Component {
    render() {
        console.log(this.props.selectedBook)
        return (
            <Modal
                title="Issue"
                visible={this.props.issueVisible}
                onCancel={this.props.issuepopupToggled}
                // footer={null}
                className={classes.Issue_modal}
                okText="Confirm"
            >
            <IssueForm {...this.props}/>
            </Modal>
        )
    }
}

export default Issue;