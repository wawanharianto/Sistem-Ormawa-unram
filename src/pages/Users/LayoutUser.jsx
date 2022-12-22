import React from 'react';

import HeadDash from '../../component/Dashboard/HeadDash';

const LayoutUser = ({ children }) => {
  console.log(children.props);
  return (
    <React.Fragment>
      <HeadDash />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default LayoutUser;
