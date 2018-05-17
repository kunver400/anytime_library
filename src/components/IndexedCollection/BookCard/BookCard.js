import React from 'react';
import { Icon, Avatar, Card } from 'antd';
import classes from './BookCard.css';
import altimg from '../../../assets/books.jpg';

const BookCard = (props) => {
    console.log(props.book);
    return (
        <div className={classes.book_card}>
            {/* Book one
            <Icon type="setting" />
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
            {props.book?
            <Card style={{backgroundColor: 'transparent',   border: 'none'}} title={props.book.title} bodyStyle={{padding: '12px', minHeight: '230px', backgroundColor: '#223333a6', color: '#ffffffcc'}}>
                <Card.Grid className={classes.splash_card}>
                <img alt={altimg} src={altimg} className={classes.the_book}/>
                </Card.Grid>
                <Card.Grid className={classes.desc_card}>
                <ul>
                <li>
                <label>Author: {props.book.author}</label>
                </li>
                <li>
                <label>About the book: {props.book.desc}</label>
                </li>
                </ul>
                </Card.Grid>
            </Card>:null}
        </div>
    )
}

export default BookCard;