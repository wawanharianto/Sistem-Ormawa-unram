import React, { useEffect } from 'react';
import Register from '../../component/Dashboard/Users/Register/Register';
import LayoutUser from './LayoutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../../features/auth';

function AddUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(currentLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
    if (user && user.role !== "admin") {
      navigate('/dashboard')
    }
  }, [isError, user, dispatch]);

  return (
    <LayoutUser>
      <Register />
    </LayoutUser>
  );
}

export default AddUsers;
