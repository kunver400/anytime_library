import React, { Component } from "react";
import { Table, Button, message, Icon } from "antd";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BOOK_ACTIONS from "../../redux/actions/book_actions";
import Auxi from "../../hoc/Auxi/Auxi";
import BookCard from "./BookCard/BookCard";
import Issue from "../Issue/Issue";
import Delete from "../Delete/Delete";
import AddBook from "../AddBook/AddBook";
import EditBook from "../EditBook/EditBook";
import common from "../../utils/common";
import booksExtensive from "../../utils/booksExtensive";
import classes from "./IndexedCollection.css";

const columns = [{
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 0,
    width: "35%"
}, {
    title: "Author",
    dataIndex: "author",
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 1,
    width: "25%"
},
{
    title: "Fame",
    dataIndex: "times_issued",
    sorter: (a, b) => a.times_issued - b.times_issued,
    width: window.innerWidth > 992 ? "12%" : "30%",
    key: 5,
    render: val => {
        let stars = [];
        let max_issued = booksExtensive.getMaxFame();
        let nostars = Math.floor((val / max_issued) * 5);
        for (let i = 0; i < nostars; i++) {
            stars.push(<Icon type="star" key={i} />);
        }
        for (let i = 0; i < 5 - nostars; i++) {
            stars.push(<Icon type="star-o" key={"spacer" + i} />);
        }
        return stars;
    }
}
];

if (window.innerWidth > 992) {
    columns.splice(2, 0, {
        title: "Date Added",
        dataIndex: "date_added",
        sorter: (a, b) => {
            let adate = new Date(a.date_string), bdate = new Date(b.date_string);
            return (adate < bdate ? 1 : (adate === bdate ? 0 : -1));
        },
        render: date_string => common.formatDate(date_string),
        key: 3
    });
    columns.splice(2, 0, {
        title: "Available units",
        dataIndex: "availablity",
        sorter: (a, b) => a.availablity - b.availablity,
        key: 4
    });
}

class IndexedCollection extends Component {
    state = {
        addBookModalVisisble: false,
        editBookModalVisisble: false,
        data: null
    };
    selectedBooks = [];
    fetchBooks = (params = {}) => {
        if (this.props.allBooks.length === 0 || params.force) {
            this.selectedBooks = [];
            Axios.get("/books.json")
                .then(response => {
                    let formattedResponse = common.formatBooks(response.data);
                    this.props.SetBooks(formattedResponse);
                    this.setState({
                        data: this.props.allBooks
                    });
                    this.filterResults(this.props.match.params.search);
                })
                .catch(() => {
                    console.log("something went wrong.");
                });
        }
        else {
            this.setState({
                data: this.props.allBooks
            });
            this.filterResults(this.props.match.params.search);
        }
    };
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.selectedBooks = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.title,
        }),
    };
    onRowClick = (record) => {
        this.props.SetCurrentBook(record);
    };
    componentDidMount() {
        this.fetchBooks();
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.match.params.search !== this.props.match.params.search)
            this.filterResults(newProps.match.params.search);
    }
    ToggleAddBookModal = () => {
        this.setState({ addBookModalVisisble: !this.state.addBookModalVisisble });
    }
    ToggleEditBookModal = () => {
        this.setState({ editBookModalVisisble: !this.state.editBookModalVisisble });
    }
    ifSelected = () => {
        if (this.selectedBooks.length === 0) {
            message.warning("No entries selected.");
            return false;
        }
        else return true;
    }
    filterResults = (searchText, column = ["title", "author"]) => {
        const reg = new RegExp(searchText, "gi");
        this.setState({
            data: this.props.allBooks.map((record) => {
                let match = false;
                column.forEach(col => {
                    if (!match)
                        match = record[col].match(reg);
                });
                if (!match) {
                    return null;
                }
                return record;
            }).filter(record => !!record),
        },()=>{
            if(this.props.match.params.search)
                this.props.SetCurrentBook(this.state.data[0]);
        });
    }
    render() {
        return (
            <Auxi>
                <BookCard book={this.props.selectedBook} {...this.props} toogleEditModal={this.ToggleEditBookModal} />
                <Table columns={columns}
                    dataSource={this.state.data}
                    rowSelection={this.rowSelection}
                    onRow={(record) => {
                        return { onClick: () => this.onRowClick(record) };
                    }}
                    size='middle'
                    pagination={{ position: "top" }}
                />
                <Button disabled={!this.props.user} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksIssueModal(this.selectedBooks); }}>Issue</Button>
                <Button disabled={!this.props.user || !this.props.user.isAdmin} className={classes.table_action_button} onClick={this.ToggleAddBookModal}>Add Book</Button>
                <Button disabled={!this.props.user || !this.props.user.isAdmin} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksDeleteModal(this.selectedBooks); }}>Delete Entries</Button>
                <Issue {...this.props} reissue={false} />
                <Delete {...this.props} reloadTable={this.fetchBooks} />
                <AddBook AddBookVisible={this.state.addBookModalVisisble} ToggleAddBookModal={this.ToggleAddBookModal} reloadTable={this.fetchBooks} />
                <EditBook book={this.props.selectedBook} EditBookVisible={this.state.editBookModalVisisble} ToggleEditBookModal={this.ToggleEditBookModal} reloadTable={this.fetchBooks} />
            </Auxi>
        );
    }
}

const mapStateToProps = state => {
    return {
        allBooks: state.bookReducer.allBooks,
        issueVisible: state.bookReducer.issueModalVisible,
        selectedBook: state.bookReducer.currentBook,
        selectedBooks: state.bookReducer.currentBooks,
        deleteVisible: state.bookReducer.deleteModalVisible
    };
};
const mapDispatchToProps = dispatch => {
    return {
        SetBooks: (allbooks) => dispatch({ type: BOOK_ACTIONS.SET_BOOKS, books: allbooks }),
        SetCurrentBook: (book) => dispatch({ type: BOOK_ACTIONS.SET_CURRENT_BOOK, book: book }),
        bookIssueModal: () => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOK }),
        booksIssueModal: (books) => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOKS, books: books }),
        booksDeleteModal: (books) => dispatch({ type: BOOK_ACTIONS.DELETE_BOOKS, books: books }),
        ToggleIssueModal: () => dispatch({ type: BOOK_ACTIONS.TOGGLE_ISSUE_MODAL }),
        ToggleDeleteModal: () => dispatch({ type: BOOK_ACTIONS.TOGGLE_DELETE_MODAL })
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexedCollection));