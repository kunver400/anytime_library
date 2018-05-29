import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';

import BOOK_ACTIONS from '../../redux/actions/book_actions';
import Auxi from '../../hoc/Auxi/Auxi';
import BookCard from './BookCard/BookCard';
import Issue from '../Issue/Issue';
import common from '../../utils/common';
import classes from './IndexedCollection.css';

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 0
}, {
    title: 'Author',
    dataIndex: 'author',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 1
},
{
    title: 'Date Added',
    dataIndex: 'date_added',
    sorter: (a, b) => {
        let adate = new Date(a.date_string), bdate = new Date(b.date_string);
        return (adate < bdate ? 1 : (adate === bdate ? 0 : -1));
    },
    render: date_string => common.formatDate(date_string),
    key: 3
}, {
    title: 'Available units',
    dataIndex: 'availablity',
    sorter: (a, b) => a.availablity - b.availablity,
    key: 4
}, {
    title: 'Popularity',
    dataIndex: 'times_issued',
    sorter: (a, b) => a.times_issued - b.times_issued,
    key: 5
}
];



class IndexedCollection extends Component {
    state = {
        data: [],
        loading: false,
        selectedBook: null
    };
    selectedBooks = [];
    fetchBooks = (params = {}) => {
        this.setState({ loading: true });
        Axios.get('/books.json')
            .then(response => {
                let formattedResponse = common.formatBooks(response.data);
                this.setState({
                    loading: false,
                    data: formattedResponse,
                    selectedBook: formattedResponse[0]
                });
            })
            .catch(response => {
                console.log('something went wrong.');
            });
    };
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.selectedBooks = selectedRows;
            console.log(this.selectedBooks);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.title,
        }),
    };
    onRowClick = (record) => {
        this.setState({
            selectedBook: record
        })
    };
    componentDidMount() {
        this.fetchBooks();
    };
    render() {
        return (
            <Auxi>
                <BookCard book={this.state.selectedBook} {...this.props} />
                <Table columns={columns}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    rowSelection={this.rowSelection}
                    onRow={(record) => {
                        return { onClick: () => this.onRowClick(record) };
                    }}
                    size='middle'
                    pagination={false}
                />
                <Button className={classes.table_action_button}  onClick={()=>{this.props.booksIssueModal(this.selectedBooks)}}>Issue All</Button>
                <Button className={classes.table_action_button} >Delete Entries</Button>
                <Button className={classes.table_action_button} >Edit Entries</Button>
                <Issue {...this.props} />
            </Auxi>
        )
    }
}

const mapStateToProps = state => {
    return {
        issueVisible: state.bookReducer.issueModalVisible,
        selectedBook: state.bookReducer.currentBook,
        selectedBooks: state.bookReducer.currentBooks
    }
}
const mapDispatchToProps = dispatch => {
    return {
        bookIssueModal: (book) => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOK, book: book }),
        booksIssueModal: (books) => dispatch({type: BOOK_ACTIONS.ISSUE_BOOKS, books: books})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexedCollection);