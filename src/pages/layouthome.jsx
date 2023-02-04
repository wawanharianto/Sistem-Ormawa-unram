import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const LayoutHome = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default LayoutHome;
