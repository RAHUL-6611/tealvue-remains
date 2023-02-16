import { FunctionComponent } from 'react';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';

import { LayoutSettings } from 'interfaces';
// import { BREAKPOINTS } from 'constants/breakpoints';
// import Navbar from './Navbar';
// import SideBar from './SideBar';
import Navigation from './Navigation/Sidebar';

const Layout: FunctionComponent<LayoutSettings> = ({ children }) => {
  // const [openNav, setOpenNav] = useState(false);
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   if (window.matchMedia(`(min-width: ${BREAKPOINTS.md})`).matches) {
  //     setOpenNav(true);
  //   }
  // }, [pathname]);

  // return (
  //   <>
  //     <Navbar {...{ openNav, setOpenNav }} />

  //     <StyledMain open={openNav}>
  //       {/* <SideBar /> */}
  //       <Navigation />

  //       {/* <section
  //         className="main"
  //         onClick={() => {
  //           if (window.matchMedia(`(max-width: ${BREAKPOINTS.md})`).matches) {
  //             setOpenNav((old) => {
  //               if (old) return false;
  //               return old;
  //             });
  //           }
  //         }}
  //         style={{ paddingTop: '7vh' }}
  //       >
  //         {children}
  //       </section> */}
  //     </StyledMain>
  //   </>
  // );

  return (
    <div className="flex flex-1 max-h-screen overflow-hidden">
      <div className="h-screen">
        <Navigation />
      </div>

      <div className="flex flex-col w-full max-h-screen overflow-scroll no-scrollbar">
        <ContentPage>{children}</ContentPage>
      </div>
    </div>
  );
};

export default Layout;

const ContentPage = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-screen"> {children}</div>;
};
