import React, { Component } from 'react';
import usermeta from '../../utils/usermeta';

class Subscribe extends Component {
    state = {
        subbed: false
    }
    handleSubs = (author) => {
        if (!this.state.subbed)
            usermeta.subscribeAuthor(this.props.book.author)
                .then((status) => {
                    this.updateSubbed();
                })
        else usermeta.unsubscribeAuthor(this.props.book.author)
                .then((status) => {
                    this.updateSubbed();
                })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.book.title !== this.props.book.title) {
            this.updateSubbed();
        }
    }
    componentDidMount() {
        this.updateSubbed();
    }
    updateSubbed = () => {
        if (!this.props.user.subs || this.props.user.subs.indexOf(this.props.book.author) === -1)
            this.setState({ subbed: false })
        else this.setState({ subbed: true })
    }
    render() {
        return (
            <a onClick={(e) => {
                e.preventDefault();
                this.handleSubs(this.props.book.author);
            }}
                style={{ textDecoration: 'underline' }}>
                {this.state.subbed ? 'Unsubscribe author' : 'Subscribe author'}
            </a>
        )
    }
}

export default Subscribe;