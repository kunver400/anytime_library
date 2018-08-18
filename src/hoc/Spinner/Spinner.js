import React from "react";
import {Spin} from "antd";
import classes from "./Spinner.css";
const Spinner = (props) => {
    return (
        <div className={classes.Spinner} onClick={props.callback} style={props.visible?null:{display:"none"}}>
            <Spin size={"large"} className={classes.Spin} tip={"Loading..."}/>
        </div>
    );
};
export default Spinner;