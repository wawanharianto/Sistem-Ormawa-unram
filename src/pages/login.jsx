import React, { useEffect } from 'react';
import LayoutHome from "./layouthome";
import Login from "../component/Login/Login"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../features/auth';

const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(currentLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, dispatch]);
  
  return (
    <LayoutHome>
      <Login />
    </LayoutHome>
  );
}

export default LoginUser;