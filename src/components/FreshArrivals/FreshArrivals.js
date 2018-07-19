import React, { Component } from 'react';
import { Card, Col, Icon } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import common from '../../utils/common';
import BOOK_ACTIONS from '../../redux/actions/book_actions';
import Issue from '../Issue/Issue';

import altimg from '../../assets/books.jpg';
import classes from './FreshArrivals.css'
import './FreshArrivals.raw.css?raw';
const { Meta } = Card;
class FreshArrivals extends Component {
    state = {
        books: []
    }
    fetchBooks = (params = {}) => {
        return new Promise((resolve) => {
            if (this.props.allBooks.length === 0 || params.force) {
                Axios.get('/books.json')
                    .then(response => {
                        let formattedResponse = common.formatBooks(response.data);
                        this.props.SetBooks(formattedResponse);
                        resolve(formattedResponse);
                    })
                    .catch(response => {
                        console.log('something went wrong.');
                    });
            }
            else resolve(this.props.allBooks);
        })
    };
    handleCardClick = (book) => {
        this.props.SetCurrentBook(book);
        this.props.history.push('/indexofbooks');
    }
    componentDidMount() {
        this.fetchBooks()
            .then((data) => {
                let books = common.getLatestBooks(data);
                this.setState({ books: books });
            })
    }
    render() {
        let bookCards = this.state.books.map((item, index) => {
            return (
                <Col md={6} xs={12} sm={8} key={index}>
                    <Card
                        hoverable
                        cover={<img alt="example" src={item.cover ? item.cover : altimg} />}
                        className={classes.cards}
                        bodyStyle={{padding: '12px'}}
                        onClick={()=>this.handleCardClick(item)}
                        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                        <Meta
                            title={item.title}
                            description={item.author}
                        />
                    </Card>
                </Col>
            )
        })
        return (
            <div className={classes.FreshArrivals}>
                {bookCards}
                <Issue {...this.props} reissue={false} reload={() => { }} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        allBooks: state.bookReducer.allBooks,
        issueVisible: state.bookReducer.issueModalVisible
    }
}
const mapDispatchToProps = dispatch => {
    return {
        SetBooks: (allbooks) => dispatch({ type: BOOK_ACTIONS.SET_BOOKS, books: allbooks }),
        SetCurrentBook: (book) => dispatch({ type: BOOK_ACTIONS.SET_CURRENT_BOOK, book: book }),
        bookIssueModal: () => dispatch({ type: BOOK_ACTIONS.ISSUE_BOOK }),
        ToggleIssueModal: () => dispatch({ type: BOOK_ACTIONS.TOGGLE_ISSUE_MODAL })
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FreshArrivals));