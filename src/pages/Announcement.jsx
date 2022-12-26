import React, { useEffect } from 'react';
import LayoutHome from "./layouthome";
import Pengumuman from "../component/Pengumuman/Pengumuman";

const Announcement = () => {
  return (
    <LayoutHome>
      <Pengumuman />
    </LayoutHome>
  );
}

export default Announcement;