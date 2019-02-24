import React, { Component } from "react";
import { Table, Button, message } from "antd";
import Axios from "axios";
import { connect } from "react-redux";

import UserContext from "../../contexts/UserContext";
import BOOK_ACTIONS from "../../redux/actions/book_actions";

import Issue from "../Issue/Issue";
import Return from "../Return/Return";
import common from "../../utils/common";
import usermeta from "../../utils/usermeta";
import classes from "./IssuedBooks.css";

const columns = [{
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 0,
    width: "30%"
}, {
    title: "Author",
    dataIndex: "author",
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 1
},
{
    title: "Units Issued",
    dataIndex: "units",
    sorter: (a, b) => a.units - b.units,
    key: 2
},
{
    title: "Return Date",
    dataIndex: "rdate",
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
        issuedBooks: [],
    };
    selectedBooks = [];
    fetchBooks = (params = {}) => {
        return new Promise((resolve) => {
            if (this.props.allBooks.length === 0 || params.force) {
                this.selectedBooks = [];
                Axios.get("/books.json")
                    .then(response => {
                        let formattedResponse = common.formatBooks(response.data);
                        this.props.SetBooks(formattedResponse);
                        resolve();
                    })
                    .catch(() => {
                        console.log("something went wrong.");
                    });
            }
            else resolve();
        });
    };
    fetchIssuedBooks = () => {
        this.fetchBooks()
            .then(() => {
                usermeta.getIssuedBooks()
                    .then((data) => {
                        let issuedBooks = [];
                        if (data.issuedBooks) {
                            issuedBooks = this.props.allBooks.filter(book => {
                                let isIssued = false;
                                data.issuedBooks.forEach(item => { if (item.bkey === book.key) isIssued = true; });
                                return isIssued;
                            });
                            issuedBooks = issuedBooks.map((item, index) => {
                                return {
                                    ...item,
                                    units: data.issuedBooks[index].units,
                                    rdate: data.issuedBooks[index].rdate
                                };
                            });
                        }
                        this.setState({ issuedBooks: issuedBooks });
                    });
            });
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.selectedBooks = selectedRows;
        },
        getCheckboxProps: record => ({
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.title,
        }),
    };
    componentDidMount() {
        this.fetchIssuedBooks();
    }
    ifSelected = () => {
        if (this.selectedBooks.length === 0) {
            message.warning("No entries selected.");
            return false;
        }
        else return true;
    }
    render() {
        return (
            <React.Fragment>
                <Table columns={columns}
                    dataSource={this.state.issuedBooks}
                    rowSelection={this.rowSelection}
                    size='middle'
                    pagination={false}
                />
                <UserContext.Consumer>
                    {user=>(
                        <React.Fragment>
                            <Button disabled={!user} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksReturnModal(this.selectedBooks); }}>Return</Button>
                            <Button disabled={!user} className={classes.table_action_button} onClick={() => { this.ifSelected() && this.props.booksIssueModal(this.selectedBooks); }}>Re-Issue</Button>
                        </React.Fragment>
                    )}
                </UserContext.Consumer>
                <Issue {...this.props} reissue={true} reload={this.fetchIssuedBooks} />
                <Return {...this.props} reload={this.fetchIssuedBooks} allIssued={this.state.issuedBooks}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        allBooks: state.bookReducer.allBooks,
        issueVisible: state.bookReducer.issueModalVisible,
        returnVisible: state.bookReducer.returnModalVisisble,
        selectedBooks: state.bookReducer.currentBooks,
        issueKey: state.bookReducer.issueKey
    };
};
const mapDispatchToProps = dispatch => {
    return {
        SetBooks: (allbooks) => dispatch({ type: BOOK_ACTIONS.SET_BOOKS, books: allbooks }),
        booksIssueModal: (books) => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOKS, books: books }),
        booksReturnModal: (books) => dispatch({ type: BOOK_ACTIONS.RETURN_BOOKS, books: books }),
        ToggleIssueModal: () => dispatch({ type: BOOK_ACTIONS.TOGGLE_ISSUE_MODAL }),
        ToggleReturnModal: () => dispatch({type: BOOK_ACTIONS.TOGGLE_RETURN_MODAL})
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(IssuedBooks);