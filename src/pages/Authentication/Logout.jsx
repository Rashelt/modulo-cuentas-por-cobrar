import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useStore from "../../helpers/store";

const Logout = () => {
    const { logout } = useStore();
    const history = useHistory();

    useEffect(() => {
        logout();
        history.push("/login");
    }, []);

    return <></>;
};

export default Logout;
