// import React from 'react';
// import ShowHeader from './showHeader';
// import Footer from './footer';
// import { ToastContainer } from 'react-toastify';

// const UserLayout = ({ children }) => {
//   return (
//     <>
//       <ShowHeader />
//       <div className="container container-fluid">
//       <ToastContainer theme='dark' />
//         {children}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import ShowHeader from './showHeader';
import Footer from './footer';
import { ToastContainer } from 'react-toastify';

const UserLayout = () => {
  return (
    <>
      <ShowHeader>
        <div className="container container-fluid">
          <ToastContainer theme='dark' />
          <Outlet />
        </div>
      </ShowHeader>
    </>
  );
};

export default UserLayout;
