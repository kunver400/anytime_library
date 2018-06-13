import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';

import classes from './Return.css'

class Return extends Component {
    ReturnBooks = () => {
        let newIssued = this.props.allIssued.filter(book => {
            let keep = true;
            this.props.selectedBooks.forEach(el => {
                if (el.key === book.key)
                    keep = false;
            })
            return keep;
        });
        newIssued = newIssued.map(book => {
            return {
                bkey: book.key,
                rdate: book.rdate,
                units: book.units
            }
        })
        Axios.patch('issues/' + this.props.issueKey + '.json', { issued: newIssued, ukey: this.props.user.key })
            .then((response) => {
                this.popSuccess();
            })
            .catch(this.handleError);
    }
    popSuccess = (response) => {
        Modal.success({
            title: 'Operation completed.',
            content: (
                <div>
                    <span>Following entries returned:</span>
                    <ol>
                        {this.props.selectedBooks.map(book => <li key={book.key}>{book.title} X {book.units}</li>)}
                    </ol>
                </div>
            ),
        });
        this.props.ToggleReturnModal();
        this.props.reload();
    }

    render() {
        let books = this.props.selectedBooks.map((item, index) => {
            return (
                <li key={index}>
                    {item.title} X {item.units}
                </li>
            )
        });
        return (
            <Modal
                title="Return"
                visible={this.props.returnVisible}
                onCancel={this.props.ToggleReturnModal}
                footer={null}
                className={classes.Return_modal}
                okText="Confirm"
                style={{ top: 20 }}
            >
                <div className={classes.message}>Following entries will be returned, are you sure?</div>
                <ol>
                    {books}
                </ol>
                <div style={{ marginTop: '25px', textAlign: 'center' }}>
                    <Button onClick={this.ReturnBooks}>Confirm</Button>
                </div>
            </Modal>
        )
    }
}

export default Return;