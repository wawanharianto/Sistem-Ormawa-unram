import React, { useEffect } from 'react';
import LayoutHome from "./layouthome";
import Pengumuman from "../component/Pengumuman/Pengumuman";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentLogin } from '../features/auth';

const Announcement = () => {
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
      <Pengumuman />
    </LayoutHome>
  );
}

export default Announcement;