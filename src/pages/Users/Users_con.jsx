import React, { useEffect } from 'react';
import LayoutUser from './LayoutUser';
import UserForm from '../../component/Dashboard/form/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../../features/auth';

function Users_con() {
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
      <UserForm />
    </LayoutUser>
  );
}

export default Users_con;
