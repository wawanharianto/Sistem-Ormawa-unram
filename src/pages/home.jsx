import React, { useEffect } from 'react';
import LayoutHome from './layouthome';
import Content from '../component/Content';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../features/auth';

const Home = () => {
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
      <Content />
    </LayoutHome>
  );
};

export default Home;
