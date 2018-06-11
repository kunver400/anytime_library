import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';

import BOOK_ACTIONS from '../../redux/actions/book_actions';
import Auxi from '../../hoc/Auxi/Auxi';

import Issue from '../Issue/Issue';

import common from '../../utils/common';
import classes from './IssuedBooks.css';
import usermeta from '../../utils/usermeta';

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 0,
    width: '30%'
}, {
    title: 'Author',
    dataIndex: 'author',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 1
},
{
    title: 'Units Issued',
    dataIndex: 'units',
    sorter: (a, b) => a.units - b.units,
    key: 2
},
{
    title: 'Return Date',
    dataIndex: 'rdate',
    sorter: (a, b) => {
        let adate = new Date(a.date_string), bdate = new Date(b.date_string);
        return (adate < bdate ? 1 : (adate === bdate ? 0 : -1));
    },
    render: date_string => common.formatDate(date_string),
    key: 3
} 
];


class IssuedBooks extends Component {
    state = {
        loading: false,
        issuedBooks: [],
    };
    selectedBooks = [];
    issueKey;
    fetchBooks = (params = {}) => {
        return new Promise((resolve)=>{
            if (this.props.allBooks.length === 0 || params.force) {
                this.selectedBooks = [];
                Axios.get('/books.json')
                    .then(response => {
                        let formattedResponse = common.formatBooks(response.data);
                        this.props.SetBooks(formattedResponse);
                        resolve();
                    })
                    .catch(response => {
                        console.log('something went wrong.');
                    });
            }
            else resolve();
        })
    };
    fetchIssuedBooks = () => {
        this.setState({ loading: true });
        this.fetchBooks()
        .then((response)=>{
            usermeta.getIssuedBooks()
            .then((data)=>{
                this.issueKey = data.key;
                let issuedBooks = this.props.allBooks.filter(book => {
                    let isIssued = false;
                    data.issuedBooks.forEach(item => {if(item.bkey === book.key) isIssued=true});
                    return isIssued;
                })
                issuedBooks = issuedBooks.map((item,index)=>{
                    return {
                        ...item,
                        units: data.issuedBooks[index].units,
                        rdate: data.issuedBooks[index].rdate
                    };
                })
                this.setState({issuedBooks: issuedBooks, loading: false});
            })
        })
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.selectedBooks = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.title,
        }),
    };
    componentDidMount() {
        this.fetchIssuedBooks();
    };
    ifSelected = () => {
        if (this.selectedBooks.length === 0) {
            message.warning('No entries selected.');
            return false;
        }
        else return true;
    }
    render() {
        return (
            <Auxi>
                <Table columns={columns}
                    dataSource={this.state.issuedBooks}
                    loading={this.state.loading}
                    rowSelection={this.rowSelection}
                    size='small'
                    pagination={false}
                />
                <Button disabled={!this.props.user} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksIssueModal(this.selectedBooks) }}>Return</Button>
                <Button disabled={!this.props.user} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksIssueModal(this.selectedBooks) }}>Re-Issue</Button>
                <Issue {...this.props} reissue={true} reload={this.fetchIssuedBooks}/>
            </Auxi>
        )
    }
}

const mapStateToProps = state => {
    return {
        allBooks: state.bookReducer.allBooks,
        issueVisible: state.bookReducer.issueModalVisible,
        selectedBooks: state.bookReducer.currentBooks
    }
}
const mapDispatchToProps = dispatch => {
    return {
        SetBooks: (allbooks) => dispatch({ type: BOOK_ACTIONS.SET_BOOKS, books: allbooks }),
        booksIssueModal: (books) => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOKS, books: books }),
        ToggleIssueModal: () => dispatch({ type: BOOK_ACTIONS.TOGGLE_ISSUE_MODAL }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IssuedBooks);