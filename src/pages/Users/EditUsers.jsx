import React, {useEffect} from 'react';
import UpdateUser from '../../component/Dashboard/Users/Register/UpdateUser';
import LayoutUser from './LayoutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../../features/auth';

function UpdateUsers() {
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
      <UpdateUser/>
    </LayoutUser>
  );
}

export default UpdateUsers;