import React from "react";
import {Outlet} from "react-router-dom";
import {Navigate} from "react-router-dom";

import {RootState} from "../state/store";
import {getUser} from "../state/auth/auth-slice";
import {useDispatch, useSelector} from "../hooks/redux-hooks";




const ProtectedLayout = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);
    if (!userData && !localStorage.getItem('accessToken')) {
        return <Navigate replace to={"/login"}/>;
    }
    if (!userData && localStorage.getItem('accessToken')) {
        dispatch(getUser());
    }


    return (
        <>
            <Outlet/>
        </>
    );
};

export default ProtectedLayout;
