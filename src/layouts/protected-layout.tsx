import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Navigate} from "react-router-dom";

import {useSelector} from "react-redux";
import {RootState} from "../state/store";
import {getUser} from "../state/auth/auth-slice";
import {useDispatch} from "../hooks/redux-hooks";




const ProtectedLayout = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);
    if (!userData && !localStorage.getItem('accessToken')) {
        return <Navigate replace to={"/login"}/>;
    } else if (!userData && localStorage.getItem('accessToken')) {
        dispatch(getUser());
    }


    return (
        <>
            <Outlet/>
        </>
    );
};

export default ProtectedLayout;
