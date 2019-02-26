import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    const [timer, setTimer] = useState(10);
    let timeoutRef;
    useEffect(() => {
        timeoutRef && clearTimeout(timeoutRef);
        if (timer > 0) timeoutRef = setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
    }, [timer]);
    return (
        <React.Fragment>
            <h1>error 404: </h1>
            <h3>You've stumbled upon nothing. </h3>
            <p>Redirecting...({timer})</p>
            {timer === 0 ? <Redirect to="/" /> : null}
        </React.Fragment>
    );
};
export default NotFound;