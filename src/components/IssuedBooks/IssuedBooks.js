import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';

import BOOK_ACTIONS from '../../redux/actions/book_actions';
import Auxi from '../../hoc/Auxi/Auxi';

import Issue from '../Issue/Issue';

import common from '../../utils/common';
import classes from './IssuedBooks.css';

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 0,
    width: '35%'
}, {
    title: 'Author',
    dataIndex: 'author',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 1,
    width: '35%'
},
{
    title: 'Units Issued',
    dataIndex: 'availablity',
    sorter: (a, b) => a.availablity - b.availablity,
    key: 4
}
];


class IssuedBooks extends Component {
    state = {
        loading: false,
        addBookModalVisisble: false,
        editBookModalVisisble: false
    };
    selectedBooks = [];
    fetchBooks = (params = {}) => {
            if (this.props.allBooks.length === 0 || params.force) {
                this.selectedBooks = [];
                this.setState({ loading: true });
                Axios.get('/books.json')
                    .then(response => {
                        let formattedResponse = common.formatBooks(response.data);
                        this.props.SetBooks(formattedResponse);
                        this.setState({loading: false});
                    })
                    .catch(response => {
                        console.log('something went wrong.');
                    });
            }
    };
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
        this.fetchBooks();
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
                    dataSource={this.props.allBooks}
                    loading={this.state.loading}
                    rowSelection={this.rowSelection}
                    size='small'
                    pagination={false}
                />
                <Button disabled={!this.props.user} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksIssueModal(this.selectedBooks) }}>Issue</Button>
                <Issue {...this.props} />
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