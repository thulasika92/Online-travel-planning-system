// import React from 'react';
// import Header from './header';

// const AdminLayout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       <div className="container container-fluid">
//         {children}
//       </div>
//     </>
//   );
// };

// export default AdminLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import { ToastContainer } from 'react-toastify';

const AdminLayout = () => {
    return (
        <>
            <Header />
            <ToastContainer theme='dark' />
            <Outlet />
        </>
    );
};

export default AdminLayout;
