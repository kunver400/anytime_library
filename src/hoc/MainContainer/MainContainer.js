import React, { useState } from "react";
import { Layout, Icon } from "antd";
import UserContext from "../../contexts/UserContext";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

import classes from "./MainContainer.css";

const MainContainer = (props) => {
    const [backdrop,setBackdrop] = useState(false);
    const siderController = () => {
        setBackdrop(!props.toggleSider());
    };
    return (
        <Layout>
            <Backdrop visible={backdrop} callback={siderController} />
            <Spinner visible={props.spinnyVisible} />
            <Icon
                className={classes.trigger}
                type={props.siderState ? "right-square" : "menu-fold"}
                style={props.siderState ? null : { display: "none" }}
                onClick={siderController}
            />
            <UserContext.Provider value={props.user}>
                <ContentWrapper setUser={props.setUser} />
            </UserContext.Provider>
        </Layout>
    );
};

export default MainContainer;