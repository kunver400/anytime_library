import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./NotFound.css";

class NotFound extends Component {
    state = {
        timer: 10
    }
    timeoutRef;
    componentDidMount() {
        this.timeoutRef = setInterval(()=>{
            let timer = this.state.timer;
            this.setState({
                timer: --timer
            });
        },1000);
    }
    render() {
        return (
            <React.Fragment>
                <h1>error 404: </h1>
                <h3>You've stumbled upon nothing. </h3>
                <p>Redirecting...({this.state.timer})</p>
                {this.state.timer===0 && !clearTimeout(this.timeoutRef)?<Redirect to="/" />:null}
            </React.Fragment>
        );
    }
}
export default NotFound;