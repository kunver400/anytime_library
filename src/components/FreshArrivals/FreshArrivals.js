import React, { Component } from "react";
import { Card, Col, Icon, Tooltip } from "antd";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import common from "../../utils/common";
import BOOK_ACTIONS from "../../redux/actions/book_actions";
import Issue from "../Issue/Issue";

import altimg from "../../assets/books.jpg";
import classes from "./FreshArrivals.css";
import "./FreshArrivals.raw.css?raw";
const { Meta } = Card;
const MAX_ENTRIES = 12;
class FreshArrivals extends Component {
    state = {
        books: []
    }
    fetchBooks = (params = {}) => {
        return new Promise((resolve) => {
            if (this.props.allBooks.length === 0 || params.force) {
                Axios.get("/books.json")
                    .then(response => {
                        let formattedResponse = common.formatBooks(response.data);
                        this.props.SetBooks(formattedResponse);
                        resolve(formattedResponse);
                    })
                    .catch(() => {
                        console.log("something went wrong.");
                    });
            }
            else resolve(this.props.allBooks);
        });
    };
    handleTitleClick = (book) => {
        this.props.SetCurrentBook(book);
        this.props.history.push("/indexofbooks");
    }
    handleIssue = (book) => {
        this.props.SetCurrentBook(book);
        this.props.bookIssueModal();
    }
    setBooks = () => {
        this.fetchBooks()
            .then((data) => {
                let books = common.getSortedBooks(data, this.props.match.params.sorter);
                books = books.splice(0, MAX_ENTRIES);
                this.setState({ books: books });
            });
    }
    componentDidMount() {
        this.setBooks();
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.match.params.sorter !== this.props.match.params.sorter)
            this.setBooks();
    }
    render() {
        let bookCards = this.state.books.map((item, index) => {
            return (
                <Col md={6} xs={12} sm={8} key={index}>
                    <UserContext.Consumer>
                        {user => <Card
                            cover={<img style={{ cursor: "pointer" }} onClick={() => this.handleTitleClick(item)} alt="example" src={item.cover ? item.cover : altimg} />}
                            className={classes.cards}
                            bodyStyle={{ padding: "12px" }}
                            actions={[<Tooltip key="0" placement="topLeft" title={!user ? "You should login first" : "Issue this Book"}><Icon type="tag-o" style={!user ? { cursor: "not-allowed" } : null} onClick={() => {
                                if (user)
                                    this.handleIssue(item);
                            }} /></Tooltip>,
                            <Tooltip key="1" placement="topLeft" title="More from the Author"><Icon type="layout" onClick={() => { this.props.history.push("/indexofbooks/" + item.author); }} /></Tooltip>]}
                        >
                            <Meta
                                title={<span style={{ cursor: "pointer" }} onClick={() => this.handleTitleClick(item)}>{item.title}</span>}
                                description={item.author}
                            />
                        </Card>
                        }
                    </UserContext.Consumer>

                </Col>
            );
        });
        return (
            <div className={classes.FreshArrivals}>
                {bookCards}
                <Issue {...this.props} reissue={false} reload={() => { }} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        allBooks: state.bookReducer.allBooks,
        issueVisible: state.bookReducer.issueModalVisible,
        selectedBook: state.bookReducer.currentBook,
        selectedBooks: state.bookReducer.currentBooks
    };
};
const mapDispatchToProps = dispatch => {
    return {
        SetBooks: (allbooks) => dispatch({ type: BOOK_ACTIONS.SET_BOOKS, books: allbooks }),
        SetCurrentBook: (book) => dispatch({ type: BOOK_ACTIONS.SET_CURRENT_BOOK, book: book }),
        bookIssueModal: () => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOK }),
        ToggleIssueModal: () => dispatch({ type: BOOK_ACTIONS.TOGGLE_ISSUE_MODAL })
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FreshArrivals));