import React from 'react';
import classes from './Backdrop.css'
const Backdrop = (props) => {
    return (
        <div className={classes.Backdrop} onClick={props.callback} style={props.visible?null:{display:'none'}}></div>
    );
}
export default Backdrop;