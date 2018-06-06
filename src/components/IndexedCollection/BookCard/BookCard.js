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
                <img alt={props.book.title} src={props.book.cover?props.book.cover:altimg} className={classes.the_book}/>
                </Card.Grid>
                <Card.Grid className={classes.desc_card}>
                <ul style={{paddingLeft: '25px'}}>
                <li>
                <label><b>Author:</b> {props.book.author}</label>
                </li>
                <li className={classes.desc}>
                <label><b>About the book:</b> {props.book.desc}</label>
                </li>
                <li style={{listStyleType:'none'}}>
                <Button size='large' className={classes.card_button} disabled = {!props.user} onClick={()=>{props.bookIssueModal(props.book)}}>Issue this book</Button>
                <Button size='large' className={classes.card_button} style={{marginLeft: '15px'}} disabled={!props.user || !props.user.isAdmin}>Edit Entry</Button>
                </li>
                </ul>
                </Card.Grid>
            </Card>:null}
        </div>
    )
}

export default BookCard;