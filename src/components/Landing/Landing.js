import React from 'react';
import { Icon } from 'antd';
import classes from './Landing.css'

const Landing = () => {
    return (
        <div className={classes.landing}>
        <span style={{ color: '#ffffffab'}}>Hi wanderer <Icon type="smile" style={{ 'color': '#ffffffab', 'fontSize': 14 }} /> , here's what you're looking for..</span>
        <div className={classes.landing_splash}>
            <p>The solo depot for all you will ever read.</p>
        </div>
        </div>
    )
}

export default Landing;