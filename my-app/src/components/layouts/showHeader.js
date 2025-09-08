// src/components/layouts/Layout.js

// import Header from './header';
// import Footer from './footer';
// import { useLocation } from 'react-router-dom';

// const ShowHeader = ({ children }) => {
//   const location = useLocation();

//   // Routes where the header should be hidden
//   const hideHeaderRoutes = ["/safaris"];
//   const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

//   return (
//     <>
//       {shouldShowHeader && <Header />}
//       <div className="container container-fluid">
//         {children}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ShowHeader;

// src/components/layouts/Layout.js

import Header from './header';
import SafariHeader from './safariHeader'; // Create this component for the safari header
import Footer from './footer';
import { useLocation, matchPath } from 'react-router-dom';

const ShowHeader = ({ children }) => {
  const location = useLocation();

  // Routes where the safari header should be shown
  const safariRoutes = ["/safaris", "/safariCart", "/safariBooking/payment", "/safariOrder/success"];
  
  // Check if the current route is a match for safari details
  const isSafariDetail = matchPath("/safari/:id", location.pathname);

  // Conditionally render the appropriate header based on the route
  const shouldShowSafariHeader = safariRoutes.includes(location.pathname) || isSafariDetail;

  return (
    <>
      {shouldShowSafariHeader ? <SafariHeader /> : <Header />}
      <div className="container container-fluid">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ShowHeader;


