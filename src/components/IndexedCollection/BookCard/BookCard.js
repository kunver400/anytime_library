import React from 'react';
import { Card, Button } from 'antd';
import classes from './BookCard.css';
import altimg from '../../../assets/books.jpg';

const BookCard = (props) => {
    return (
        <div className={classes.book_card}>
            {props.book?
            <Card style={{backgroundColor: 'transparent',   border: 'none'}} title={props.book.title} bodyStyle={{padding: '12px', minHeight: '230px', backgroundColor: '#223333d1', color: '#ffffffcc'}}>
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
                <li style={{listStyleType:'none'}}>
                <Button size='large' onClick={()=>{props.bookIssueModal(props.book)}}>Issue this book</Button>
                </li>
                </ul>
                </Card.Grid>
            </Card>:null}
        </div>
    )
}

export default BookCard;