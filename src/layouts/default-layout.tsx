import React from "react";
import {  Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {RootState} from "../state/store";
import {useSelector} from "../hooks/redux-hooks";

const DefaultLayout = () => {
  const userData = useSelector((state: RootState) => state.auth.basicUserInfo);

  if (userData) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultLayout;
