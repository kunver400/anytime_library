import React, { useContext } from "react";
import { List } from "antd";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import Subscribe from "../Subscribe/Subscribe";
import classes from "./SubscribedAuthors.css";

const SubscribedAuthors = () => {
    const user = useContext(UserContext);
    return (
        <div className={classes.list_container}>
            <List
                dataSource={user? user.subs:[]}
                renderItem={item => (
                    <List.Item
                        actions={[<Subscribe key="0" book={{ author: item }} user={user} />]}
                    >
                        <List.Item.Meta
                            title={<Link to={"/indexofbooks/" + item}>{item}</Link>}
                        />
                    </List.Item>)}
            />
        </div>
    );
};

export default SubscribedAuthors;