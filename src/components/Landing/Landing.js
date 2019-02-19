import React from "react";
import { Icon } from "antd";
import classes from "./Landing.css";
import logo from "../../assets/book.svg";
const Landing = (props) => {
    return (
        <div className={classes.landing}>
            <span style={{ color: "#ffffffab" }}>

            </span>
            <div className={classes.landing_splash}>
                <p className={[classes.splash_head,classes.splash_welcome].join(" ")}>
                    {props.user ? props.user.nickname + "'s Anytime Library." :
                        <React.Fragment>
                            Hi wanderer <Icon type="smile" style={{ "color": "#ffffffab", "fontSize": 14 }} /> , here's what you're looking for..
                        </React.Fragment>
                    }
                </p>
                <img src={logo} alt='na' className={classes.logo} />
                <p className={classes.splash_head}>#Anytime Library</p>
                <p className={[classes.splash_head,classes.splash_subhead].join(" ")}>The solo depot to serve your mental appetite.</p>
            </div>
        </div>
    );
};

export default Landing;