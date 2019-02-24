import React,{useContext} from "react";
import { Card, Button } from "antd";
import Subscribe from "../../Subscribe/Subscribe";
import classes from "./BookCard.css";
import altimg from "../../../assets/books.jpg";
import UserContext from "../../../contexts/UserContext";

const BookCard = (props) => {
    const user = useContext(UserContext);
    return (
        <div className={classes.book_card}>
            {props.book?
                <Card style={{backgroundColor: "transparent",   border: "none"}} title={props.book.title} bodyStyle={{padding: "12px", minHeight: "230px", backgroundColor: "#223333d1", color: "#ffffffcc"}}>
                    <Card.Grid className={classes.splash_card}>
                        <img alt={props.book.title} src={props.book.cover?props.book.cover:altimg} className={classes.the_book}/>
                    </Card.Grid>
                    <Card.Grid className={classes.desc_card}>
                        <ul style={{paddingLeft: "25px"}}>
                            <li>
                                <label><b>Author:</b> {props.book.author}</label>
                            </li>
                            {user?<li style={{listStyleType:"none",paddingBottom:"0",paddingTop:"0"}}>
                                <Subscribe book={props.book} user={user}/>
                            </li>:null}
                            <li className={classes.desc}>
                                <label><b>About the book:</b> {props.book.desc}</label>
                            </li>
                            <li style={{listStyleType:"none"}}>
                                <Button size='large' className={classes.card_button} disabled = {!user} onClick={()=>{props.bookIssueModal();}}>Issue this book</Button>
                                <Button size='large' className={classes.card_button} style={{marginLeft: "15px"}} disabled={!user || !user.isAdmin} onClick={props.toogleEditModal}>Edit Entry</Button>
                            </li>
                        </ul>
                    </Card.Grid>
                </Card>:null}
        </div>
    );
};

export default BookCard;