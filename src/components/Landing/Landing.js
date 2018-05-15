import React from 'react';
import { Icon } from 'antd';
import Aux from '../../hoc/Aux/Aux'
import classes from './Landing.css'

const Landing = (props) => {
    return (
        <div className={classes.landing}>
        <span style={{ color: '#ffffffab'}}>
        {props.user?props.user.nickname+"'s Anytime Library":
        <Aux>
        Hi wanderer <Icon type="smile" style={{ 'color': '#ffffffab', 'fontSize': 14 }} /> , here's what you're looking for..
        </Aux>
        }
        </span>
        <div className={classes.landing_splash}>
            <p>The solo depot for all you will ever read.</p>
        </div>
        </div>
    )
}

export default Landing;