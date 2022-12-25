import React, { useEffect } from 'react';
import Dashboard from '../../component/Dashboard/Content/Dashboard';
import LayoutUser from './LayoutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../../features/auth';

function Dashboard_con() {
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
    <LayoutUser>
      <Dashboard />
    </LayoutUser>
  );
}

export default Dashboard_con;
