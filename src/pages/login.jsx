import React, { useEffect } from 'react';
import LayoutHome from "./layouthome";
import Login from "../component/Login/Login"

const LoginUser = () => {
  return (
    <LayoutHome>
      <Login />
    </LayoutHome>
  );
}

export default LoginUser;