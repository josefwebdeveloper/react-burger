import React from "react";
import {  Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import {useSelector} from "react-redux";
import {RootState} from "../state/store";



const ProtectedLayout = () => {
    const userData = useSelector((state: RootState) => state.auth.basicUserInfo);


    if (!userData) {
    return <Navigate replace to={"/login"} />;
  }



  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
