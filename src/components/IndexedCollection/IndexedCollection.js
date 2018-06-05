import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';

import BOOK_ACTIONS from '../../redux/actions/book_actions';
import Auxi from '../../hoc/Auxi/Auxi';
import BookCard from './BookCard/BookCard';
import Issue from '../Issue/Issue';
import Delete from '../Delete/Delete';
import AddBook from '../AddBook/AddBook';
import common from '../../utils/common';
import classes from './IndexedCollection.css';

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
    width: '25%'
},
window.innerWidth > 992?{
    title: 'Date Added',
    dataIndex: 'date_added',
    sorter: (a, b) => {
        let adate = new Date(a.date_string), bdate = new Date(b.date_string);
        return (adate < bdate ? 1 : (adate === bdate ? 0 : -1));
    },
    render: date_string => common.formatDate(date_string),
    width: '12.5%',
    key: 3
}:{}, 
window.innerWidth > 992?{
    title: 'Available units',
    dataIndex: 'availablity',
    sorter: (a, b) => a.availablity - b.availablity,
    width: '12.5%',
    key: 4
}:{}, 
{
    title: 'Fame',
    dataIndex: 'times_issued',
    sorter: (a, b) => a.times_issued - b.times_issued,
    width: '15%',
    key: 5
}
];



class IndexedCollection extends Component {
    state = {
        data: [],
        loading: false,
        selectedBook: null,
        addBookModalVisisble: false
    };
    selectedBooks = [];
    fetchBooks = (params = {}) => {
        this.selectedBooks = [];
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
            console.log(selectedRows);
            this.selectedBooks = selectedRows;
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
    ToggleAddBookModal = () => {
        this.setState({addBookModalVisisble: !this.state.addBookModalVisisble});
    }
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
                    pagination={{position: 'top'}}
                />
                <Button className={classes.table_action_button}  onClick={()=>{this.props.booksIssueModal(this.selectedBooks)}}>Issue</Button>
                <Button className={classes.table_action_button} onClick={this.ToggleAddBookModal}>Add Book</Button>
                <Button className={classes.table_action_button} onClick={()=>{this.props.booksDeleteModal(this.selectedBooks)}}>Delete Entries</Button>
                <Button className={classes.table_action_button} >Edit Entries</Button>
                <Issue {...this.props} />
                <Delete {...this.props} reloadTable={this.fetchBooks}/>
                <AddBook AddBookVisible={this.state.addBookModalVisisble} ToggleAddBookModal={this.ToggleAddBookModal} reloadTable={this.fetchBooks}/>
            </Auxi>
        )
    }
}

const mapStateToProps = state => {
    return {
        issueVisible: state.bookReducer.issueModalVisible,
        selectedBook: state.bookReducer.currentBook,
        selectedBooks: state.bookReducer.currentBooks,
        deleteVisible: state.bookReducer.deleteModalVisible
    }
}
const mapDispatchToProps = dispatch => {
    return {
        bookIssueModal: (book) => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOK, book: book }),
        booksIssueModal: (books) => dispatch({type: BOOK_ACTIONS.ISSUE_BOOKS, books: books}),
        booksDeleteModal: (books) => dispatch({type: BOOK_ACTIONS.DELETE_BOOKS, books: books}),
        ToggleIssueModal: () => dispatch({type: BOOK_ACTIONS.TOGGLE_ISSUE_MODAL}),
        ToggleDeleteModal: () => dispatch({type: BOOK_ACTIONS.TOGGLE_DELETE_MODAL})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexedCollection);